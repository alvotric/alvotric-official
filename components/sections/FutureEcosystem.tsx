import { StatusBadge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

/** Three empty, dashed slots in perspective: room for products that do not exist yet. */
function EmptySlots() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-64 w-full max-w-[460px] [perspective:1200px]">
      <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(8deg)_rotateY(-14deg)]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="panel-ghost absolute h-24 w-[72%]"
            style={{ left: `${i * 10}%`, top: `${i * 30}%`, transform: `translateZ(${i * -30}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

export function FutureEcosystem() {
  return (
    <section aria-labelledby="future-heading" className="border-b border-line bg-bg">
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:col-start-1">
            <StatusBadge status="planned" />
            <h2 id="future-heading" className="mt-6 max-w-[14ch] text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.04]">
              More tools are planned
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-muted">
              Alvotric intends to build further products in automation and developer tooling. Nothing beyond
              Alvo has been announced, and we will not list a product here until it exists in a form people
              can use or evaluate.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <EmptySlots />
          </div>
        </div>
      </Container>
    </section>
  );
}
