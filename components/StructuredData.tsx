import { allProjects, education, faqs, seo, site, stack } from "@/lib/data";

/**
 * One JSON-LD @graph covering Person, ProfilePage, WebSite, the work history,
 * the project list, and the FAQ. Google reads the Person + FAQ for rich results;
 * the sameAs links are what tie this page to the GitHub/LinkedIn identities.
 */
export default function StructuredData() {
  const personId = `${site.url}/#person`;
  const skills = stack.flatMap((g) => g.items);

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      givenName: site.firstName,
      familyName: site.lastName,
      url: site.url,
      // Every honest title for the same role, so the entity matches more query phrasings.
      jobTitle: seo.jobTitles,
      description: seo.description,
      knowsLanguage: ["en", "hi", "mr"],
      nationality: { "@type": "Country", name: "India" },
      email: `mailto:${site.email}`,
      telephone: site.phone,
      image: `${site.url}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      sameAs: [site.github, site.linkedin],
      knowsAbout: skills,
      worksFor: {
        "@type": "Organization",
        name: "Enso Web Works",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: site.role,
        occupationalCategory: "15-1254.00 Web Developers",
        skills: skills.join(", "),
      },
      alumniOf: education.map((e) => ({
        "@type": "CollegeOrUniversity",
        name: e.school,
      })),
      hasCredential: education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: e.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
      })),
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: site.country,
        },
      },
      seeks: {
        "@type": "Demand",
        name: site.availability,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: seo.title,
      description: seo.description,
      mainEntity: { "@id": personId },
      about: { "@id": personId },
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      dateModified: new Date().toISOString(),
      significantLink: [`${site.url}/resume`, `${site.url}${site.resumePath}`],
      // Marks the sections a voice assistant should read aloud.
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#hero-heading", "#about h4", "#about h4 + p"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      description: seo.description,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#projects`,
      name: `Projects by ${site.name}`,
      itemListElement: allProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          ...(p.liveUrl ? { url: p.liveUrl } : {}),
          creator: { "@id": personId },
          keywords: p.stackList.join(", "),
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
