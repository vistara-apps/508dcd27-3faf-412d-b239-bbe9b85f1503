export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-subtle flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Loading Guardian AI</h2>
        <p className="text-sm text-foreground-muted">Initializing your safety net...</p>
      </div>
    </div>
  );
}
