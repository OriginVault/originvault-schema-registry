/**
 * Generated from LanguageConfiguration.json
 * Schema: https://json.schemastore.org/language-configuration.json
 * DO NOT EDIT MANUALLY - regenerate with npm run generate-types
 */

/**
 * The block comment character pair, like `/* block comment *&#47;`
 *
 * @minItems 2
 */
export type CharPair = [string, string];
/**
 * @minItems 2
 */
export type CharPair1 = [string, string];

/**
 * Configuration file for language features in VS Code and Visual Studio.
 */
export interface LanguageConfiguration {
  /**
   * The language's comment settings.
   */
  comments?: {
    /**
     * The line comment token, like `// this is a comment`.
     */
    lineComment?: string;
    blockComment?: CharPair;
  };
  /**
   * The language's brackets.
   */
  brackets?: CharPair1[];
  /**
   * The language's auto closing pairs. The 'close' character is automatically inserted with the 'open' character is typed.
   */
  autoClosingPairs?: (
    | CharPair1
    | {
        open: string;
        close: string;
        notIn?: string[];
      }
  )[];
  /**
   * What characters must be after the cursor for bracket or quote autoclosing to occur.
   */
  autoCloseBefore?: string;
  /**
   * The language's surrounding pairs. When the 'open' character is typed on a selection, the selected string is surrounded by the open and close characters.
   */
  surroundingPairs?: (
    | CharPair1
    | {
        open: string;
        close: string;
      }
  )[];
  /**
   * The language's folding rules.
   */
  folding?: {
    /**
     * Region markers used by the language.
     */
    markers?: {
      start?: string | Regexp;
      end?: string | Regexp;
    };
  };
  /**
   * The language's word definition.
   */
  wordPattern?: string | Regexp;
  /**
   * The language's indentation settings.
   */
  indentationRules?: {
    /**
     * If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).
     */
    decreaseIndentPattern: string | Regexp;
    /**
     * If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).
     */
    increaseIndentPattern: string | Regexp;
    /**
     * If a line matches this pattern, then only the next line after it should be indented once.
     */
    indentNextLinePattern?: string | Regexp;
    /**
     * If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.
     */
    unIndentedLinePattern?: string | Regexp;
  };
  /**
   * The language's rules to be evaluated when pressing Enter.
   */
  onEnterRules?: {
    beforeText: string | Regexp;
    afterText?: string | Regexp;
    previousLineText?: string | Regexp;
    action: {
      indent: "none" | "indent" | "indentOutdent" | "outdent";
      appendText?: string;
      removeText?: number;
    };
  }[];
  [k: string]: unknown;
}
export interface Regexp {
  pattern: string;
  flags?: string;
}
