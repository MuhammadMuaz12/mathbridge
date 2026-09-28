@echo off
setlocal
cd /d "%~dp0"
where npx.cmd >nul 2>&1
if errorlevel 1 (
  echo Install Node.js 24 LTS, then run this file again.
  pause
  exit /b 1
)
echo Sign in to the Vercel account where you want MathBridge hosted.
call npx.cmd --yes vercel@60.1.3 login
if errorlevel 1 goto failed
call npx.cmd --yes vercel@60.1.3 link --project mathbridge --yes
if errorlevel 1 goto failed
call npx.cmd --yes vercel@60.1.3 deploy --prod --yes --env "NEXT_PUBLIC_SUPABASE_URL=https://myuvjnmwdodrpkuvvplk.supabase.co" --env "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_EhB7gSI6gAY_SzitmLWNQg_zj-9bd7K" --build-env "NEXT_PUBLIC_SUPABASE_URL=https://myuvjnmwdodrpkuvvplk.supabase.co" --build-env "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_EhB7gSI6gAY_SzitmLWNQg_zj-9bd7K"
if errorlevel 1 goto failed
echo.
echo Finish email sign-in setup:
echo 1. Copy the Production URL printed above.
echo 2. Open https://supabase.com/dashboard/project/myuvjnmwdodrpkuvvplk/auth/url-configuration
echo 3. Set Site URL to your Production URL and add it to Redirect URLs.
echo 4. Open MathBridge and create an account using maazatiq78@gmail.com.
echo 5. Confirm your email, then sign in.
echo.
echo Use this script again for future deployments.
pause
exit /b 0
:failed
echo Deployment did not finish. Keep the error above for troubleshooting.
pause
exit /b 1
