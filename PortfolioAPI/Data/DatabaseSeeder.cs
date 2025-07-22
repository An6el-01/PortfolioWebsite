using Microsoft.VisualBasic;
using PortfolioAPI.Models;
using System.Collections.Generic;

namespace PortfolioAPI.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(PortfolioDbContext context)
        {
            context.Database.EnsureCreated();

            // Clear existing data to refresh with new images
            Console.WriteLine("Clearing existing data...");
            context.Projects.RemoveRange(context.Projects);
            context.TechStacks.RemoveRange(context.TechStacks);
            context.Experiences.RemoveRange(context.Experiences);
            context.SaveChanges();
            Console.WriteLine("Existing data cleared successfully.");

            // Add Projects
            Console.WriteLine("Adding projects to the database...");
            context.Projects.AddRange(new List<Project>
            {
                new Project
                {
                    Name = "Document Management System",
                    Organization = "VIP Spooling",
                    Description = "As a freelancer, I developed a custom Document Management System mobile aplication for a client, using AWS and React Native. This solution provided the client with tools to manage sub-users, monitor invoice tickets, oversee their team, and curate document templates and pricing forms. Sub-users gained the ablity to access and edit their created forms, complete them offline, and quickly view available pricing plans, demonstrating my ability to interpret client needs and deliver tailored solutions.",
                    ImageUrl = "http://localhost:5015/images/MockUpVIP.jpeg",
                    RepositoryUrl = "https://github.com/An6el-01/VipSpooling-Mobile.git",
                    TechStack = "[\"http://localhost:5015/images/TypeScript.png\", \"http://localhost:5015/images/ReactNativeIcon.png\", \"http://localhost:5015/images/node.png\", \"http://localhost:5015/images/AWS.png\"]",
                },
                new Project {
                    Name = "Order Management System",
                    Organization = "Shadow Foam",
                    Description = "In my current role as a Software Developer, I led the design and development of a Order Management System, leveraging Next.js, Google Cloud, and Supabase. This platform optimized product manufacturing by optimizing the nesting of parts into foam sheets and generating CAD files for CNC machines, maximizing material resource usage. The system also featured an interface for packing optimization, product group management, sub-user administration, and inventory tracking, including stock levels and damage. This project was a great learning experience, as it allowed me to demonstrate my leadership in delivering a solution that improved operational efficiency and resource optimization.",
                    ImageUrl = "http://localhost:5015/images/MockUpSF.jpeg",
                    RepositoryUrl = "https://github.com/An6el-01/Cloud_Cut.git",
                    TechStack = "[\"http://localhost:5015/images/TypeScript.png\", \"http://localhost:5015/images/JavaScript.png\", \"http://localhost:5015/images/ReactIcon.png\", \"http://localhost:5015/images/node.png\", \"http://localhost:5015/images/supabase.png\"]"
                },
                new Project
                {
                    Name = "Workout Program Builder",
                    Organization = "Experiential Learning (University of Chester)",
                    Description = "During my experiential learning university module, I served as the lead frontend developer and head of client communication within a software development team, building a workout program building web application for a client using ASP.NET Core. This solution enabled the client to manage sub-users, schedule custom workout programs, monitor progress, and handle payments efficiently. Sub-uers benefited from access to a workout library with video demonstrations, flexible scheduling options, performance insights, and integrated subscription payments. This project was a great learning experience, as it allowed me to work with a real client and build a solution that met their needs.",
                    ImageUrl = "http://localhost:5015/images/MockUpWorkoutLibrary.jpeg",
                    RepositoryUrl = "https://github.com/An6el-01/WorkoutLibrary",
                    TechStack = "[\"http://localhost:5015/images/HTML.png\", \"http://localhost:5015/images/CSS.png\", \"http://localhost:5015/images/C_sharp.png\", \"http://localhost:5015/images/ASP.png\", \"http://localhost:5015/images/Azure.png\"]",
                },
                new Project
                {
                    Name = "IoT Gateway",
                    Organization = "Dissertation Project",
                    Description = "For my final year dissertation, I was motivated to create a budget-friendly solution for comprehensive smart home control, that allowed integration of both smart and traditional electrical devices. To achieve this, I designed and built an IoT Gateway, leveraging a Raspberry Pi 4 as the central hub and a React-Native mobile application for interaction. This system provided me with convenient remote control over my home appliances, while also showcasing valuable data that allowed me to monitor and optimize my energy consumption.",
                    ImageUrl = "http://localhost:5015/images/MockUpControlPanel.jpeg",
                    RepositoryUrl = "https://github.com/An6el-01/RaspberryPi-IoT",
                    TechStack = "[\"http://localhost:5015/images/JavaScript.png\", \"http://localhost:5015/images/python.png\", \"http://localhost:5015/images/ReactNativeIcon.png\", \"http://localhost:5015/images/node.png\", \"http://localhost:5015/images/AWS.png\"]"
                }
            });
            context.SaveChanges();
            Console.WriteLine("Projects successfully added.");

            // Seed TechStacks
            var techStackSeedData = new List<TechStack>
            {
                new TechStack { Name = "React", Icon = "http://localhost:5015/images/ReactIcon.png", Type = "Framework" },
                new TechStack { Name = "React Native", Icon = "http://localhost:5015/images/ReactNativeIcon.png", Type = "Framework" },
                new TechStack { Name = "ASP.NET Core", Icon = "http://localhost:5015/images/ASP.png", Type = "Framework" },
                new TechStack { Name = "Node.js", Icon = "http://localhost:5015/images/node.png", Type = "Runtime" },
                new TechStack { Name = "JavaScript", Icon = "http://localhost:5015/images/JavaScript.png", Type = "Programming Language" },
                new TechStack { Name = "TypeScript", Icon = "http://localhost:5015/images/TypeScript.png", Type = "Programming Language" },
                new TechStack { Name = "Python", Icon = "http://localhost:5015/images/python.png", Type = "Programming Language" },
                new TechStack { Name = "C#", Icon = "http://localhost:5015/images/C_sharp.png", Type = "Programming Language" },
                new TechStack { Name = "HTML", Icon = "http://localhost:5015/images/HTML.png", Type = "Markup Language" },
                new TechStack { Name = "CSS", Icon = "http://localhost:5015/images/CSS.png", Type = "Stylesheet Language" },
                new TechStack { Name = "PostgreSQL", Icon = "http://localhost:5015/images/PostgreSQL.png", Type = "Database" },
                new TechStack { Name = "MySQL", Icon = "http://localhost:5015/images/mysql.png", Type = "Database" },
                new TechStack { Name = "Docker", Icon = "http://localhost:5015/images/docker.png", Type = "Containerization" },
                new TechStack { Name = "Google Cloud", Icon = "http://localhost:5015/images/googleCloud.png", Type = "Cloud Service" },
                new TechStack { Name = "AWS", Icon = "http://localhost:5015/images/AWS.png", Type = "Cloud Service" },
                new TechStack { Name = "Supabase", Icon = "http://localhost:5015/images/supabase.png", Type = "Cloud Service" },
                new TechStack { Name = "Azure", Icon = "http://localhost:5015/images/Azure.png", Type = "Cloud Service" }
            };

            context.TechStacks.AddRange(techStackSeedData);
            context.SaveChanges();
            Console.WriteLine("TechStacks added successfully.");

            var experienceSeedData = new List<Experience>
            {
                //Work Experiences
                new Experience{
                    Name="Shadow Foam ltd",
                    Role="Software Developer",
                    Date="February 2025 - Present",
                    Description="Led the development of a new in-house order management and manufacturing system.",
                    Type="Work",
                    ImageUrl="http://localhost:5015/images/ShadowFoam-logo.png",
                },
                new Experience{
                    Name= "Bright Network Internship Experience UK: Technology",
                    Role= "Intern",
                    Date= "29 June 2024 - 1 July 2024",
                    Description= "Gained skills in technology through hackathon-style projects with Google",
                    Type="Work",
                    ImageUrl= "http://localhost:5015/images/BrightNetworkLogo.png",

                },
                new Experience{
                    Name= "Freelance Full Stack Developer",
                    Role= "Full-Stack Developer",
                    Date= "February 2024 - Present",
                    Description= "Developed web and mobile applications for clients with React and JavaScript.",
                    Type="Work",
                    ImageUrl = "http://localhost:5015/images/EntityLogo.png",
                },
                new Experience{
                    Name= "Zebra Technologies Internship Experience Programme",
                    Role= "Intern",
                    Date= "August 2023 - September 2023",
                    Description= "Gained practical experience in user-centric design and product development",
                    Type="Work",
                    ImageUrl= "http://localhost:5015/images/ZebraTechnologiesLogo.png",
                },
                new Experience{
                    Name= "Sandler Training Sales Foundations Program",
                    Role= "Student",
                    Date= "August 2024 - November 2024",
                    Description= "Completed a Sales Foundations Program mastering consultative selling techniques.",
                    Type= "Studies",
                    ImageUrl= "http://localhost:5015/images/Sandler.png",
                },

                new Experience{
                      Name= "University of Chester",
                      Role="Student",
                      Date= "September 2020 - April 2024",
                      Description= "Completed a Bachelor's in Computer Science",
                      Type="Studies",
                      ImageUrl = "http://localhost:5015/images/UniversityOfChesterLogo.png",
                }
            };

            context.Experiences.AddRange(experienceSeedData);
            context.SaveChanges();
            Console.WriteLine("Experience added successfully.");
        }
    }
}
