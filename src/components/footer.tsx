import { Github, Mail } from "lucide-react"

const socials = [
  { label: "GitHub", href: "https://github.com/nikocantillo", icon: Github },
  { label: "Email", href: "mailto:nikolacantillo@gmail.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="px-4 py-8">
      <div className="flex items-center justify-center gap-6 text-[15px] text-foreground/75">
        <p>Nikolas Cantillo © {new Date().getFullYear()}</p>
        <ul className="flex gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex size-5 items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
