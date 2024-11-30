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
                        Name = "Financial Management App",
                        Description = " A personal finance app designed to help users track expenses, manage budgets, and set savings goals. It includes features like financial overviews, recent transactions, goal tracking, and budget insights, making it easier to organize and monitor finances in one place.",
                        ImageUrl = "http://localhost:5015/images/ComingSoon.jpg",
                        RepositoryUrl = "https://github.com/An6el-01/BudgetBee",
                        TechStack = "TypeScript, Python, JavaScript, PostgreSQL, React Native, Expo, Docker, Google Cloud.",
                    },
                    new Project
                    {
                        Name = "E-Commerce Platform",
                        Description = "A platform designed for my personal social media brand, \"The Daily Drive\", to provide users with tools and resources to enhance their productivity, fitness, and financial management. It offers products like Notion templates, Excel spreadsheets, and courses, while also promoting apps for fitness training and budget management. Additionally, it features a shop with branded merchandise.",
                        ImageUrl = "http://localhost:5015/images/ComingSoon.jpg",
                        RepositoryUrl = "https://github.com/An6el-01/TheDailyDrive_Website",
                        TechStack = "CSS, PHP, JavaScript, React, Laravel, MySQL."
                    },
                    new Project
                    {
                        Name = "AI Fitness App",
                        Description = "A mobile application designed to help users structure their workouts and diet plans based on their fitness level, goals, and time frame. It offers personalized guidance through AI, making fitness accessible and affordable.",
                        ImageUrl = "http://localhost:5015/images/ComingSoon.jpg",
                        RepositoryUrl = "https://github.com/An6el-01/AI_Fitness",
                        TechStack = "Flutter (Dart), JavaScript, Node.js, MongoDB, REST Api.",
                    },
                    new Project
                    {
                        Name = "The Workout Library",
                        Description = "Built a workout management app for a client to manage his clients' workouts and fitness progress, optimized for multi-device compatibility.",
                        ImageUrl = "http://localhost:5015/images/MockUpWorkoutLibrary.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/WorkoutLibrary",
                        TechStack = "HTML, CSS, JavaScript, C#, ASP.NET Core, SQL Server, Azure.",
                    },
                    new Project
                    {
                        Name = "Decentralized Control Panel",
                        Description = "Developed an IoT control panel application for secure, real-time device management. Optimizing energy usage and automation of devices across my home.",
                        ImageUrl = "http://localhost:5015/images/MockUpControlPanel.jpeg",
                        RepositoryUrl = "https://github.com/An6el-01/RaspberryPi-IoT",
                        TechStack = "JavaScript, Python, React Native, Node.js, AWS."
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
                new TechStack { Name = "PHP", Icon = "http://localhost:5015/images/php.png", Type = "Programming Language" },
                new TechStack { Name = "Flutter", Icon = "http://localhost:5015/images/flutter.png", Type = "Framework" },
                new TechStack { Name = "JavaScript", Icon = "http://localhost:5015/images/JavaScript.png", Type = "Programming Language" },
                new TechStack { Name = "TypeScript", Icon = "http://localhost:5015/images/TypeScript.png", Type = "Programming Language" },
                new TechStack { Name = "Python", Icon = "http://localhost:5015/images/Python.png", Type = "Programming Language" },
                new TechStack { Name = "C#", Icon = "http://localhost:5015/images/C_sharp.png", Type = "Programming Language" },
                new TechStack { Name = "HTML", Icon = "http://localhost:5015/images/HTML.png", Type = "Markup Language" },
                new TechStack { Name = "CSS", Icon = "http://localhost:5015/images/CSS.png", Type = "Stylesheet Language" },
                new TechStack { Name = "PostgreSQL", Icon = "http://localhost:5015/images/PostgreSQL.png", Type = "Database" },
                new TechStack { Name = "MongoDB", Icon = "http://localhost:5015/images/MongoDB.png", Type = "Database" },
                new TechStack { Name = "MySQL", Icon = "http://localhost:5015/images/mysql.png", Type = "Database" },
                new TechStack { Name = "Docker", Icon = "http://localhost:5015/images/docker.png", Type = "Containerization" },
                new TechStack { Name = "Google Cloud", Icon = "http://localhost:5015/images/googleCloud.png", Type = "Cloud Service" },
                new TechStack { Name = "Azure", Icon = "http://localhost:5015/images/Azure.png", Type = "Cloud Service" },
                new TechStack { Name = "AWS", Icon = "http://localhost:5015/images/AWS.png", Type = "Cloud Service" }
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
                    Name= "Bright Network Internship Experience UK: Technology",
                    Role= "Internship",
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
                    Name=" HSBC Digital Business Services",
                    Role="Intern",
                    Date="September 2023 - October 2023",
                    Description="Analyzed transaction data and brainstormed initiatives for net zero.",
                    Type="Work",
                    ImageUrl="http://localhost:5015/images/hsbcLogo.png",
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
