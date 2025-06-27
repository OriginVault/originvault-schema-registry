#!/usr/bin/env python3
"""
Enhanced Schema Validator - Includes JSON-LD context for interoperability scoring
Validates schemas against OriginVault design principles including Open Verifiable compatibility
"""

import os
import json
import hashlib
from pathlib import Path
from typing import Dict, List, Set, Any, Optional
import re

class SchemaValidator:
    def __init__(self, schema_directory: str = "schemas/v1"):
        self.schema_directory = Path(schema_directory)
        self.design_principles = {
            "multi_root_trust": {
                "required_properties": ["rootType", "governanceModel", "delegationChain", "trustChainContext"],
                "weight": 0.25
            },
            "did_integration": {
                "patterns": [r"did:", r"DID", r"decentralized", r"identifier"],
                "weight": 0.20
            },
            "verifiable_credentials": {
                "patterns": [r"credential", r"VC", r"verifiable", r"claim"],
                "weight": 0.20
            },
            "cross_platform_compatibility": {
                "patterns": [r"interop", r"compatible", r"standard", r"W3C"],
                "weight": 0.15
            },
            "bff_integration": {
                "required_properties": ["id", "metadata", "timestamps", "blockchainSync"],
                "weight": 0.20
            }
        }
    
    def calculate_quality_score(self, schema: Dict[str, Any]) -> float:
        """
        Calculate schema quality score (0.0-5.0) based on five factors:
        1. Required JSON Schema fields (1.0 point)
        2. Property descriptions (1.0 point) 
        3. Examples provided (1.0 point)
        4. Schema validation metadata (1.0 point)
        5. JSON-LD context for interoperability (1.0 point)
        """
        score = 0.0
        
        # Factor 1: Required JSON Schema fields (1.0 point)
        required_fields = ["$schema", "type", "properties"]
        if all(field in schema for field in required_fields):
            score += 1.0
        elif "$schema" in schema and "type" in schema:
            score += 0.5
        
        # Factor 2: Property descriptions (1.0 point)
        if "properties" in schema:
            properties = schema["properties"]
            total_props = len(properties)
            described_props = sum(1 for prop in properties.values() 
                                if isinstance(prop, dict) and "description" in prop)
            if total_props > 0:
                score += (described_props / total_props)
        
        # Factor 3: Examples provided (1.0 point)
        has_schema_examples = "examples" in schema
        has_property_examples = False
        
        if "properties" in schema:
            for prop in schema["properties"].values():
                if isinstance(prop, dict) and "examples" in prop:
                    has_property_examples = True
                    break
        
        if has_schema_examples and has_property_examples:
            score += 1.0
        elif has_schema_examples or has_property_examples:
            score += 0.5
            
        # Factor 4: Schema validation metadata (1.0 point)
        validation_features = 0
        max_validation_features = 4
        
        # Check for validation patterns
        if self._has_validation_patterns(schema):
            validation_features += 1
            
        # Check for required fields
        if "required" in schema and isinstance(schema["required"], list) and len(schema["required"]) > 0:
            validation_features += 1
            
        # Check for constraints (minLength, maxLength, etc.)
        if self._has_constraints(schema):
            validation_features += 1
            
        # Check for enum values or format specifications
        if self._has_format_specifications(schema):
            validation_features += 1
            
        score += (validation_features / max_validation_features)
        
        # Factor 5: JSON-LD context for interoperability (1.0 point) - NEW!
        jsonld_score = self._calculate_jsonld_score(schema)
        score += jsonld_score
        
        return min(score, 5.0)  # Cap at 5.0
    
    def _calculate_jsonld_score(self, schema: Dict[str, Any]) -> float:
        """
        Calculate JSON-LD context score for interoperability (0.0-1.0)
        """
        score = 0.0
        
        # Check for @context field
        if "@context" in schema:
            context = schema["@context"]
            
            # Full point for proper @context
            if isinstance(context, list) and len(context) > 0:
                score += 0.6  # Base score for having @context
                
                # Bonus points for standard contexts
                context_str = str(context).lower()
                if "schema.org" in context_str:
                    score += 0.2  # Schema.org context
                if any(url in context_str for url in ["w3.org", "jsonld.org"]):
                    score += 0.1  # W3C/JSON-LD standards
                if "originvault" in context_str or "openverifiable" in context_str:
                    score += 0.1  # Platform-specific context
                    
            elif isinstance(context, str) and context.startswith("http"):
                score += 0.5  # String context gets partial credit
                
        # Check for $id field with proper URI
        if "$id" in schema:
            schema_id = schema["$id"]
            if isinstance(schema_id, str) and schema_id.startswith("https://"):
                score += 0.2  # Proper schema ID adds to interoperability
                
        # Check for JSON-LD properties in schema
        jsonld_properties = ["@type", "@id", "@context"]
        if "properties" in schema:
            for prop_name in schema["properties"]:
                if prop_name in jsonld_properties:
                    score += 0.1
                    break
        
        return min(score, 1.0)  # Cap at 1.0
    
    def _has_validation_patterns(self, schema: Dict[str, Any]) -> bool:
        """Check if schema has validation patterns"""
        if "properties" in schema:
            for prop in schema["properties"].values():
                if isinstance(prop, dict) and "pattern" in prop:
                    return True
        return False
    
    def _has_constraints(self, schema: Dict[str, Any]) -> bool:
        """Check if schema has length/value constraints"""
        constraint_fields = ["minLength", "maxLength", "minimum", "maximum", "minItems", "maxItems"]
        
        if any(field in schema for field in constraint_fields):
            return True
            
        if "properties" in schema:
            for prop in schema["properties"].values():
                if isinstance(prop, dict) and any(field in prop for field in constraint_fields):
                    return True
        return False
    
    def _has_format_specifications(self, schema: Dict[str, Any]) -> bool:
        """Check if schema has format specifications or enums"""
        if "enum" in schema or "format" in schema:
            return True
            
        if "properties" in schema:
            for prop in schema["properties"].values():
                if isinstance(prop, dict) and ("enum" in prop or "format" in prop):
                    return True
        return False
    
    def validate_design_principles(self, schema: Dict[str, Any]) -> Dict[str, float]:
        """Validate schema against OriginVault design principles"""
        principle_scores = {}
        
        for principle_name, principle_config in self.design_principles.items():
            score = 0.0
            
            if "required_properties" in principle_config:
                # Check for required properties
                required_props = principle_config["required_properties"]
                found_props = 0
                
                # Check in schema properties
                if "properties" in schema:
                    for prop in required_props:
                        if prop in schema["properties"]:
                            found_props += 1
                
                # Check in schema root
                for prop in required_props:
                    if prop in schema:
                        found_props += 1
                
                score = found_props / len(required_props)
                
            elif "patterns" in principle_config:
                # Check for patterns in schema content
                schema_text = json.dumps(schema).lower()
                patterns = principle_config["patterns"]
                found_patterns = sum(1 for pattern in patterns if re.search(pattern.lower(), schema_text))
                score = min(found_patterns / len(patterns), 1.0)
            
            principle_scores[principle_name] = score
            
        return principle_scores
    
    def analyze_schema(self, schema_path: Path) -> Dict[str, Any]:
        """Analyze a single schema file"""
        try:
            with open(schema_path, 'r', encoding='utf-8') as f:
                schema = json.load(f)
        except Exception as e:
            return {
                "error": f"Failed to load schema: {e}",
                "quality_score": 0.0,
                "principle_scores": {}
            }
        
        quality_score = self.calculate_quality_score(schema)
        principle_scores = self.validate_design_principles(schema)
        
        # Calculate design principle compliance
        design_score = sum(principle_scores.values()) / len(principle_scores) if principle_scores else 0.0
        
        # Check BFF compatibility 
        bff_compatible = principle_scores.get("bff_integration", 0.0) > 0.5
        
        # Check multi-root support
        multi_root_support = principle_scores.get("multi_root_trust", 0.0) > 0.3
        
        # Check for JSON-LD context
        has_jsonld_context = "@context" in schema
        jsonld_score = self._calculate_jsonld_score(schema)
        
        return {
            "name": schema_path.stem,
            "quality_score": quality_score,
            "max_quality_score": 5.0,  # Updated max score
            "design_score": design_score,
            "principle_scores": principle_scores,
            "bff_compatible": bff_compatible,
            "multi_root_support": multi_root_support,
            "has_jsonld_context": has_jsonld_context,
            "jsonld_score": jsonld_score,
            "schema_size_kb": round(schema_path.stat().st_size / 1024, 2) if schema_path.exists() else 0
        }
    
    def validate_all_schemas(self) -> Dict[str, Any]:
        """Validate all schemas in the directory"""
        results = []
        
        if not self.schema_directory.exists():
            return {
                "error": f"Schema directory {self.schema_directory} does not exist",
                "results": []
            }
        
        schema_files = list(self.schema_directory.glob("*.json"))
        
        for schema_file in schema_files:
            result = self.analyze_schema(schema_file)
            results.append(result)
        
        # Calculate summary statistics
        valid_results = [r for r in results if "error" not in r]
        
        if valid_results:
            avg_quality = sum(r["quality_score"] for r in valid_results) / len(valid_results)
            avg_design = sum(r["design_score"] for r in valid_results) / len(valid_results)
            bff_compatible_count = sum(1 for r in valid_results if r["bff_compatible"])
            multi_root_count = sum(1 for r in valid_results if r["multi_root_support"])
            jsonld_context_count = sum(1 for r in valid_results if r["has_jsonld_context"])
            
            bff_compatibility_rate = (bff_compatible_count / len(valid_results)) * 100
            multi_root_rate = (multi_root_count / len(valid_results)) * 100
            jsonld_context_rate = (jsonld_context_count / len(valid_results)) * 100
        else:
            avg_quality = avg_design = bff_compatibility_rate = multi_root_rate = jsonld_context_rate = 0.0
        
        return {
            "total_schemas": len(schema_files),
            "valid_schemas": len(valid_results),
            "avg_quality_score": round(avg_quality, 3),
            "avg_design_score": round(avg_design, 3),
            "bff_compatibility_rate": round(bff_compatibility_rate, 1),
            "multi_root_support_rate": round(multi_root_rate, 1),
            "jsonld_context_rate": round(jsonld_context_rate, 1),
            "results": results
        }
    
    def generate_report(self, output_file: str = "governance/schema-validation-report.md"):
        """Generate a comprehensive validation report"""
        validation_results = self.validate_all_schemas()
        
        report_lines = [
            "# OriginVault Schema Validation Report",
            "",
            f"**Generated**: {self._get_timestamp()}",
            "",
            "## Summary",
            "",
            f"- **Total Schemas**: {validation_results['total_schemas']}",
            f"- **Valid Schemas**: {validation_results['valid_schemas']}",
            f"- **Average Quality Score**: {validation_results['avg_quality_score']}/5.0",
            f"- **Average Design Score**: {validation_results['avg_design_score']}/1.0",
            f"- **BFF Compatibility**: {validation_results['bff_compatibility_rate']}%",
            f"- **Multi-Root Support**: {validation_results['multi_root_support_rate']}%",
            f"- **JSON-LD Context Support**: {validation_results['jsonld_context_rate']}%",
            "",
            "## Quality Scoring Methodology",
            "",
            "Schemas are scored on 5 factors (1.0 point each, max 5.0):",
            "",
            "1. **Required JSON Schema fields** - $schema, type, properties",
            "2. **Property descriptions** - All properties have descriptions", 
            "3. **Examples provided** - Schema-level and property-level examples",
            "4. **Schema validation metadata** - Patterns, constraints, required fields",
            "5. **JSON-LD context for interoperability** - @context field with standard vocabularies",
            "",
            "## Design Principles Coverage",
            "",
            "- **Multi-Root Trust**: Supports diverse authority models",
            "- **DID Integration**: Uses decentralized identifiers", 
            "- **Verifiable Credentials**: Compatible with VC standards",
            "- **Cross-Platform Compatibility**: Follows open standards",
            "- **BFF Integration**: Compatible with backend-for-frontend pattern",
            "",
            "## Detailed Results",
            ""
        ]
        
        # Sort results by quality score (highest first)
        sorted_results = sorted(validation_results["results"], 
                              key=lambda x: x.get("quality_score", 0), reverse=True)
        
        for result in sorted_results:
            if "error" in result:
                report_lines.append(f"### ❌ {result.get('name', 'Unknown')} - ERROR")
                report_lines.append(f"- **Error**: {result['error']}")
            else:
                # Determine emoji based on quality score
                if result["quality_score"] >= 4.0:
                    emoji = "🟢"
                elif result["quality_score"] >= 3.0:
                    emoji = "🟡"
                else:
                    emoji = "🔴"
                    
                report_lines.extend([
                    f"### {emoji} {result['name']}",
                    f"- **Quality Score**: {result['quality_score']:.2f}/5.0",
                    f"- **Design Score**: {result['design_score']:.2f}/1.0",
                    f"- **BFF Compatible**: {'✅' if result['bff_compatible'] else '❌'}",
                    f"- **Multi-Root Support**: {'✅' if result['multi_root_support'] else '❌'}",
                    f"- **JSON-LD Context**: {'✅' if result['has_jsonld_context'] else '❌'} (Score: {result['jsonld_score']:.2f})",
                    f"- **Schema Size**: {result['schema_size_kb']} KB",
                    ""
                ])
        
        # Write report to file
        report_content = "\n".join(report_lines)
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        print(f"✅ Schema validation report generated: {output_file}")
        return output_file
    
    def _get_timestamp(self) -> str:
        """Get current timestamp in ISO format"""
        from datetime import datetime
        return datetime.now().isoformat()

def main():
    """Run schema validation"""
    print("🚀 Starting Enhanced Schema Validation with JSON-LD Context Scoring...")
    
    validator = SchemaValidator()
    
    # Generate comprehensive report
    report_file = validator.generate_report()
    
    # Run validation and show summary
    results = validator.validate_all_schemas()
    
    print(f"\n📊 Validation Summary:")
    print(f"   Total Schemas: {results['total_schemas']}")
    print(f"   Average Quality: {results['avg_quality_score']:.2f}/5.0")
    print(f"   BFF Compatible: {results['bff_compatibility_rate']:.1f}%")
    print(f"   Multi-Root Support: {results['multi_root_support_rate']:.1f}%")
    print(f"   JSON-LD Context: {results['jsonld_context_rate']:.1f}%")
    print(f"\n📄 Full report: {report_file}")

if __name__ == "__main__":
    main() 