// Timeline de experiencia profesional.
// Los logos van en /public/logos/. Si una entrada no tiene logo, se muestra
// un nodo con la inicial de la empresa.

export type ExperienceRole = {
  title: string
  period: string
  location?: string
}

export type ExperienceEntry = {
  company: string
  period: string
  location?: string
  logo?: string
  roles: ExperienceRole[]
  description: string
  highlights?: string[]
  tags?: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: "Oracle",
    period: "2023 — Presente",
    logo: "/logos/oracle.png",
    roles: [
      {
        title: "Principal Consultant",
        period: "Abr 2025 — Presente",
        location: "Bogotá, Colombia",
      },
      {
        title: "Data Engineer",
        period: "Jul 2023 — Abr 2025",
        location: "Santiago, Chile",
      },
    ],
    description:
      "Consultoría y desarrollo sobre Oracle Cloud Infrastructure para clientes enterprise: pipelines de datos con OCI Dataflow (Spark), procesamiento a escala con Python y arquitectura de soluciones de datos en la nube.",
    tags: ["OCI Dataflow", "PySpark", "Python", "SQL", "Cloud Architecture"],
  },
  {
    company: "ACL",
    period: "Jun 2023 — Abr 2025",
    location: "Santiago, Chile · Remoto",
    logo: "/logos/acl.png",
    roles: [
      {
        title: "Oracle Cloud Specialist Consultant",
        period: "Jun 2023 — Abr 2025",
        location: "Santiago, Chile · Remoto",
      },
    ],
    description:
      "Especialista en migraciones de datos, implementación de APIs y procesamiento avanzado con PySpark, como parte de ACL (Aplicaciones Computacionales de Chile), partner estratégico con Oracle como cliente principal.",
    highlights: [
      "Migración de datos desde AWS hacia OCI",
      "Implementación de APIs con el API Gateway de Oracle",
      "Transformaciones y análisis de alto rendimiento con PySpark",
    ],
    tags: ["OCI", "AWS", "PySpark", "API Gateway", "Data Migration"],
  },
  {
    company: "INTEREDES",
    period: "Sep 2022 — Jul 2023",
    logo: "/logos/interedes.png",
    roles: [
      {
        title: "Python Developer",
        period: "Sep 2022 — Jul 2023",
      },
    ],
    description:
      "Desarrollo backend con Django Rest Framework para sistemas críticos del negocio: notificaciones, integración de bases de datos y una suite CRM.",
    highlights: [
      "Sistema de notificaciones: backend y APIs integradas con Kafka para envío masivo de emails en tiempo real y a escala",
      "Interconexión de bases de datos: APIs de sincronización entre sistemas, mejorando consistencia de datos y reduciendo latencias",
      "Suite CRM: arquitectura de backends y APIs interoperables entre sí y con sistemas externos",
    ],
    tags: ["Django", "DRF", "Kafka", "GraphQL", "PostgreSQL"],
  },
  {
    company: "Globalbit S.A.S",
    period: "Sep 2021 — Jul 2022",
    logo: "/logos/globalbit.png",
    roles: [
      {
        title: "Python Developer",
        period: "Sep 2021 — Jul 2022",
      },
    ],
    description:
      "Desarrollo backend en Python para productos digitales: APIs, integraciones y automatización de procesos.",
    tags: ["Python", "APIs", "Backend"],
  },
  {
    company: "Freelance",
    period: "Hasta 2021",
    roles: [
      {
        title: "Desarrollador & Data Freelancer",
        period: "Hasta 2021",
      },
    ],
    description:
      "Proyectos independientes de datos y desarrollo de software para distintos clientes: automatización, análisis de datos y soluciones a medida. Esta etapa me dio la base práctica para moverme entre ingeniería, datos y producto.",
    tags: ["Python", "Automatización", "Análisis de datos"],
  },
]
