using ContactList.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactList.Data
{
    public static class ApplicationDbInitializer
    {
        public static void Seed(IApplicationBuilder builder)
        {
            using (var serviceScope = builder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                if (!context.Contacts.Any())
                {
                    context.Contacts.AddRange(
                        new Contact()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "Koyla",
                            Surname = "Koval",
                            Email = "kovalkola2@gmail.com",
                            Status = "Friend",
                            Gender = "lego",
                            Image = "8",
                            Phone = "+380969827519"
                        },
                        new Contact()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "Andrii",
                            Surname = "Trofimchuk",
                            Email = "test@axy.com",
                            Status = "Work",
                            Gender = "men",
                            Image = "15",
                            Phone = "+380968785421"
                        },
                        new Contact()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "Yurii",
                            Surname = "Budnyk",
                            Email = "xyz@gmail.com",
                            Status = "Friend",
                            Gender = "women",
                            Image = "78",
                            Phone = "+380968754239"
                        }
                    );
                    context.SaveChanges();
                }
            }
        }
    }
}
