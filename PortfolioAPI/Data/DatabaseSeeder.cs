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


            // Add Projects if none exists
            if (!context.Projects.Any())
            {
                Console.WriteLine("Adding projects to the database...");
                context.Projects.AddRange(new List<Project>
                {
                    new Project
                    {
                        Name = "VIP Spooling",
                        Description = "Custom form management system mobile app.",
                        ImageUrl = "http://localhost:5015/images/MockUpVIP.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/VipSpooling-Mobile.git",
                        TechStack = new string[] 
                        { 
                            "http://localhost:5015/images/TypeScript.png", 
                            "http://localhost:5015/images/ReactNativeIcon.png",
                            "http://localhost:5015/images/node.png",
                            "http://localhost:5015/images/AWS.png" 
                        },
                    },
                    new Project {
                        Name = "Shadow Foam",
                        Description = "In house order management and manufacturing system.",
                        ImageUrl = "http://localhost:5015/images/MockUpSF.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/Cloud_Cut.git",
                        TechStack = new string[] 
                        {
                            "http://localhost:5015/images/TypeScript.png",
                            "http://localhost:5015/images/JavaScript.png",
                            "http://localhost:5015/images/ReactIcon.png",
                            "http://localhost:5015/images/node.png",
                            "http://localhost:5015/images/Supabase.png"
                        }
                    },
                    new Project
                    {
                        Name = "The Workout Library",
                        Description = "A custom fitness program management system.",
                        ImageUrl = "http://localhost:5015/images/MockUpWorkoutLibrary.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/WorkoutLibrary",
                        TechStack = new string[]
                        {
                            "http://localhost:5015/images/HTML.png",
                            "http://localhost:5015/images/CSS.png",
                            "http://localhost:5015/images/C_sharp.png",
                            "http://localhost:5015/images/ASP.png",
                            "http://localhost:5015/images/Azure.png",
                        },
                    },
                    new Project
                    {
                        Name = "Decentralized Control Panel",
                        Description = "An IoT control panel mobile app.",
                        ImageUrl = "http://localhost:5015/images/MockUpControlPanel.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/RaspberryPi-IoT",
                        TechStack = new string[]
                        {
                            "http://localhost:5015/images/JavaScript.png",
                            "http://localhost:5015/images/python.png",
                            "http://localhost:5015/images/ReactNativeIcon.png",
                            "http://localhost:5015/images/node.png",
                            "http://localhost:5015/images/AWS.png",
                        }
                    }
                });
                context.SaveChanges();
                Console.WriteLine("Projects successfully added.");
            }
            else
            {
                Console.WriteLine("Projects already exist in the database.");
            }

            // Seed TechStacks
            var techStackSeedData = new List<TechStack>
            {
                new TechStack { Name = "React", Icon = "http://localhost:5015/images/ReactIcon.png", Type = "Framework" },
                new TechStack { Name = "React Native", Icon = "http://localhost:5015/images/ReactNativeIcon.png", Type = "Framework" },
                new TechStack { Name = "ASP.NET Core", Icon = "http://localhost:5015/images/ASP.png", Type = "Framework" },
                new TechStack { Name = "Node.js", Icon = "http://localhost:5015/images/node.png", Type = "Runtime" },
                new TechStack { Name = "JavaScript", Icon = "http://localhost:5015/images/JavaScript.png", Type = "Programming Language" },
                new TechStack { Name = "TypeScript", Icon = "http://localhost:5015/images/TypeScript.png", Type = "Programming Language" },
                new TechStack { Name = "Python", Icon = "http://localhost:5015/images/Python.png", Type = "Programming Language" },
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

            foreach (var techStackData in techStackSeedData)
            {
                var existingTechStack = context.TechStacks.FirstOrDefault(ts => ts.Name == techStackData.Name);

                if (existingTechStack != null)
                {
                    // Update existing entry
                    existingTechStack.Type = techStackData.Type;
                    existingTechStack.Icon = techStackData.Icon; // Update the icon field
                }
                else
                {
                    // Add new entry
                    context.TechStacks.Add(techStackData);
                }
            }

            context.SaveChanges();
            Console.WriteLine("TechStacks updated or added successfully.");

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

            foreach (var experienceData in experienceSeedData)
            {
                var existingExperience =  context.Experiences.FirstOrDefault(e => e.Name == experienceData.Name);

                if (existingExperience != null)
                {
                    existingExperience.Role = experienceData.Role;
                    existingExperience.Date = experienceData.Date;
                    existingExperience.Description = experienceData.Description;
                    existingExperience.Type = experienceData.Type;
                    existingExperience.ImageUrl = experienceData.ImageUrl;
                }
                else
                {
                    context.Experiences.Add(experienceData);
                }
            }

            context.SaveChanges();
            Console.WriteLine("Experience updated or added successfully.");
        }
    }
}
