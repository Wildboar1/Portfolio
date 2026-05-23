import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Certifications", link: "#projects" },
  { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Python Developer | AWS Cloud Certified | Passionate About Scalable Web & Cloud Solutions.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "Deloitte - Data Analytics Job Simulation",
    des: "Completed a comprehensive Data Analytics Job Simulation. Issued by Forage in Oct 2025. Credential ID: Y9MAjspWbwq59FeYf.",
    img: "/p1.jpeg",
    iconLists: ["/ts.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 2,
    title: "IBM - Artificial Intelligence Fundamentals",
    des: "Earned the Artificial Intelligence Fundamentals certification from IBM in Sep 2025.",
    img: "/p2.jpeg",
    iconLists: ["/ts.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 3,
    title: "AWS Academy Cloud Foundations",
    des: "Certified AWS Academy Graduate by Amazon Web Services (AWS) in Sep 2025.",
    img: "/p3.jpeg",
    iconLists: ["/ts.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 4,
    title: "Cisco - Python Essentials 1",
    des: "Completed the Python Essentials 1 course, provided by Cisco Networking Academy in collaboration with OpenEDG Python Institute in Sep 2023.",
    img: "/p4.jpeg",
    iconLists: ["/ts.svg"],
    link: "#",
    sourceCode: "#",
  },
] as const;

export const testimonials = [
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
] as const;

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
] as const;

export const workExperience = [
  {
    id: 1,
    title: "Python Developer Intern",
    desc: "ShadowFox Virtual Internship. Built Core Python projects including Web Scraper, Hangman Game, and Sales Data Analysis.",
    className: "md:col-span-2",
    thumbnail: "/exp1.jpeg",
  },
] as const;

export const socialMedia = [
  {
    name: "GitHub",
    img: "/git.svg",
    link: "https://github.com/sanidhyy",
  },
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/preetjoshi012",
  },
  {
    name: "Gmail",
    img: "/mail.svg",
    link: "mailto:preetjoshi012@gmail.com",
  },
] as const;

export const techStack = {
  stack1: ["Python", "AWS", "Program Creation"],
  stack2: ["Engineering", "A++", "Problem Solving"],
} as const;
