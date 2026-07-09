import { Button } from '@/components/ui/button';

const swatches = [
  { name: 'primary', className: 'bg-primary' },
  { name: 'secondary', className: 'bg-secondary' },
  { name: 'muted', className: 'bg-muted' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'destructive', className: 'bg-destructive' },
  { name: 'card', className: 'bg-card border border-border' },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary">Theme test</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Blihop design tokens
          </h1>
          <p className="text-muted-foreground">
            Temporary playground for colors, type, and Button variants. Replace
            with the real marketing home when ready.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Typography
          </h2>
          <p className="font-sans text-base">Sans (Inter) — body and UI</p>
          <p className="font-serif text-base">
            Serif (Source Serif 4) — editorial accents
          </p>
          <p className="font-mono text-sm">
            Mono (JetBrains Mono) — code and labels
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Colors</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="space-y-2">
                <div
                  className={`h-16 rounded-lg shadow-sm ${swatch.className}`}
                />
                <p className="font-mono text-xs text-muted-foreground">
                  {swatch.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">Sample card</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Card surface, border, and muted text using theme tokens.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="lg">Primary CTA</Button>
            <Button size="lg" variant="outline">
              Secondary
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
