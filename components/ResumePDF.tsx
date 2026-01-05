import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';

// Register standard fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 700 }, // Fallback standard
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #ccc',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align to top
  },
  headerInfo: {
    flex: 1,
    marginRight: 20,
  },
  headerPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    objectFit: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  role: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 10,
    color: '#444444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000000',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000000',
  },
  bulletPoint: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginLeft: 10,
    marginBottom: 3,
  },
  skillBadge: {
    padding: '3 8',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    fontSize: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  jobContainer: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  jobDate: {
    fontSize: 10,
    color: '#666666',
  },
  jobCompany: {
    fontSize: 10,
    color: '#2563eb', // Primary blue
    marginBottom: 5,
    fontWeight: 'bold',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  }
});

interface ResumeData {
  hero: {
    name: string;
    role: string;
    description: string;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  about: {
    title: string;
    p1: string; 
    p2: string;
  };
  experience: {
    title: string;
    jobs: {
      role: string;
      company: string;
      date: string;
      desc: string[];
    }[];
  };
  skills: {
    title: string;
    categories: {
        name: string;
        items: string[];
    }[];
  };
  education: {
    title: string;
    cert: {
        title: string;
        desc: string;
        inst: string;
    };
    languages: {
        title: string;
        es: string;
        en: string;
    }
  }
}

export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.hero.name}</Text>
            <Text style={styles.role}>{data.hero.role}</Text>
            <View style={styles.contactRow}>
                <Link src={`mailto:${data.contact.email}`} style={styles.link}>{data.contact.email}</Link>
                <Link src={data.contact.linkedin} style={styles.link}>linkedin.com/in/haroldyarturo</Link>
                <Link src={data.contact.github} style={styles.link}>github.com/ARCADEMAN21</Link>
            </View>
        </View>
        <Image src="/dev-profile.png" style={styles.headerPhoto} />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.about.title}</Text>
        <Text style={styles.text}>{data.about.p1}</Text>
        <Text style={styles.text}>{data.about.p2}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.experience.title}</Text>
        {data.experience.jobs.map((job, index) => (
          <View key={index} style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.role}</Text>
              <Text style={styles.jobDate}>{job.date}</Text>
            </View>
            <Text style={styles.jobCompany}>{job.company}</Text>
            {job.desc.map((item, i) => (
                <Text key={i} style={styles.bulletPoint}>• {item}</Text>
            ))}
          </View>
        ))}
      </View>

       {/* Skills */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.skills.title}</Text>
        {data.skills.categories.map((cat, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3 }}>{cat.name}</Text>
                <View style={styles.skillsRow}>
                    {cat.items.map((skill, i) => (
                        <View key={i} style={styles.skillBadge}>
                            <Text>{skill}</Text>
                        </View>
                    ))}
                </View>
            </View>
        ))}
      </View>

       {/* Education */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>{data.education.title}</Text>
        <View style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{data.education.cert.title}</Text>
            <Text style={styles.jobCompany}>{data.education.cert.desc}</Text>
            <Text style={styles.jobDate}>{data.education.cert.inst}</Text>
        </View>
         <View style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{data.education.languages.title}</Text>
            <Text style={styles.text}>{data.education.languages.es}</Text>
            <Text style={styles.text}>{data.education.languages.en}</Text>
        </View>
      </View>

    </Page>
  </Document>
);
