# 🚀 Development Workflow Checklist

## **Before Every Commit**
- [ ] Run `npm run pre-commit` to check types, linting, and tests
- [ ] Remove any `console.log` statements (or use `--no-verify` if intentional)
- [ ] Update documentation if APIs changed
- [ ] Add tests for new functionality

## **Before Every Push**
- [ ] Run `npm run pre-push` to ensure full build works
- [ ] Verify all files are properly committed
- [ ] Check that commit messages are descriptive
- [ ] Ensure no sensitive data (keys, passwords) in commits

## **For API Changes**
- [ ] Update API documentation
- [ ] Add/update tests for endpoints
- [ ] Check CORS headers are correct
- [ ] Verify error handling is comprehensive
- [ ] Test on Vercel deployment

## **For UI Changes**
- [ ] Test in both light and dark mode
- [ ] Check responsive design on mobile
- [ ] Verify accessibility (screen readers, keyboard navigation)
- [ ] Test loading states and error handling

## **Automated Quality Checks**

### **Available Scripts**
```bash
npm run quality-check    # Run all pre-commit checks
npm run pre-commit      # Type check + lint + test
npm run pre-push        # Full build verification
npm run type-check      # TypeScript validation
npm run build          # Production build
npm run test           # Run test suite
npm run lint           # Code style checking
```

### **Git Hooks Active**
- ✅ **pre-push**: Runs type checking and build automatically
- ✅ **pre-commit**: Runs quality checks before commits
- 🔧 **Bypass**: Use `git commit --no-verify` to skip if needed

## **Release Checklist**
- [ ] Version bump in package.json
- [ ] Update CHANGELOG.md
- [ ] Tag release with semantic version
- [ ] Deploy to Vercel
- [ ] Verify all functionality works in production

## **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| TypeScript errors | Run `npm run type-check` to see details |
| Build failures | Check `npm run build` output for errors |
| Tests failing | Run `npm test` for specific test failures |
| Linting errors | Run `npm run lint` and fix style issues |
| Git hook failures | Use `--no-verify` flag if intentional bypass needed |

## **Emergency Bypass**
If you need to bypass checks temporarily:
```bash
git commit --no-verify -m "emergency fix"
git push --no-verify
```

**Note**: Only use bypass for genuine emergencies and fix issues in next commit. 