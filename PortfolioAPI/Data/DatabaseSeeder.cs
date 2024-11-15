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
            if(!context.Projects.Any())
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
                        TechStack = "TypeScript, Python, JavaScript, SQLite, React Native, Expo, Docker, Google Cloud.",
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
                        Name = " AI Fitness App",
                        Description = "A mobile application designed to help users structure their workouts and diet plans based on their fitness level, goals, and time frame. It offers personalized guidance through AI, making fitness accessible and affordable.",
                        ImageUrl = "http://localhost:5015/images/ComingSoon.jpg",
                        RepositoryUrl = "https://github.com/An6el-01/AI_Fitness",
                        TechStack = "Flutter (Dart), JavaScript, Node.js, MongoDB, REST Api.",
                     },
                     new Project 
                     {
                        Name = "The Workout Library",
                        Description = "Built a workout management app for a client to manage his clients workouts and fitness progress, optimized for multi-device compatibility.",
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
                        TechStack = "JavaScript, Python,React Native, Node.js, AWS."
                     }
                });
                context.SaveChanges();
                Console.WriteLine("Projects Successfully added.");
            }else
            {
                Console.WriteLine("Projects already exist in the database.");    
            }
        }
    }
}