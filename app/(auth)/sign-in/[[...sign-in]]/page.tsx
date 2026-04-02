export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111827] border border-[#1E2A3A] rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold font-heading text-[#F9FAFB] mb-2">⚡ Welcome back</h1>
        <p className="text-[#9CA3AF] mb-8 text-sm">Sign in to Cryptic Daily to bookmark articles and join discussions</p>
        {/* Clerk SignIn component will go here */}
        {/* <SignIn routing="hash" /> */}
        <div className="bg-white/5 border border-[#1E2A3A] rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-4">Sign-in is powered by Clerk</p>
          <p className="text-xs text-[#4B5563]">Add your <code className="text-[#00D4FF]">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to enable authentication.</p>
        </div>
        <p className="text-sm text-[#9CA3AF] mt-6">
          Don't have an account? <a href="/sign-up" className="text-[#00D4FF] hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
