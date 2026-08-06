import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/experience"

function CompanyLogo({ company, logo }: { company: string; logo?: string }) {
  if (logo) {
    return (
      <div className="relative size-12 md:size-14 border-2 border-ink bg-white overflow-hidden shrink-0">
        <Image src={logo} alt={`Logo de ${company}`} fill className="object-contain p-2" />
      </div>
    )
  }
  return (
    <div className="size-12 md:size-14 shrink-0 border-2 border-ink bg-secondary flex items-center justify-center">
      <span className="font-display text-lg md:text-xl">{company.charAt(0)}</span>
    </div>
  )
}

export function ExperienceTimeline() {
  return (
    <ol className="relative mt-8 space-y-10">
      {/* Línea vertical */}
      <div
        aria-hidden
        className="absolute left-[23px] md:left-[27px] top-2 bottom-2 w-0.5 bg-foreground"
      />

      {experience.map((entry) => {
        const singleRole = entry.roles.length === 1
        return (
          <li key={`${entry.company}-${entry.period}`} className="relative flex gap-5 md:gap-6">
            {/* Logo como nodo del timeline */}
            <div className="relative z-10 pt-1">
              <CompanyLogo company={entry.company} logo={entry.logo} />
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-baseline justify-between flex-wrap gap-x-4 gap-y-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                  {singleRole ? (
                    <>
                      {entry.roles[0].title}{" "}
                      <span className="text-muted-foreground font-normal">· {entry.company}</span>
                    </>
                  ) : (
                    entry.company
                  )}
                </h3>
                <span className="font-mono text-xs md:text-sm text-accent whitespace-nowrap">
                  {entry.period}
                </span>
              </div>

              {singleRole && entry.roles[0].location && (
                <p className="text-xs text-muted-foreground mt-0.5">{entry.roles[0].location}</p>
              )}

              {/* Varios cargos en la misma empresa */}
              {!singleRole && (
                <ul className="mt-3 space-y-2">
                  {entry.roles.map((role) => (
                    <li key={role.title} className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className="size-1.5 bg-accent shrink-0 translate-y-[-2px]"
                      />
                      <div className="flex items-baseline justify-between flex-wrap gap-x-4 gap-y-0.5 flex-1">
                        <span className="text-sm md:text-base font-medium">
                          {role.title}
                          {role.location && (
                            <span className="text-muted-foreground font-normal text-xs md:text-sm">
                              {" "}
                              · {role.location}
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {role.period}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-sm md:text-base text-muted-foreground leading-7 mt-3">
                {entry.description}
              </p>

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                  {entry.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
