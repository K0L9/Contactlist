using ContactList.Data;
using ContactList.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ContactList.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : Controller
    {
        ApplicationDbContext _db;
        public ContactController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("get-all")]
        public IEnumerable<Contact> GetAllContacts()
        {
            return _db.Contacts.ToList();
        }

        [HttpPost("add-contact")]
        public IActionResult AddContact([FromBody] Contact contact)
        {
            contact.Id = Guid.NewGuid().ToString();
            _db.Contacts.Add(contact);
            _db.SaveChanges();
            return Created(nameof(AddContact), contact);
        }
        [HttpDelete("delete-contact/{id}")]
        public IActionResult DeleteContact(string id)
        {
            var contact = _db.Contacts.Find(id);
            if (contact == null)
                return BadRequest();

            _db.Contacts.Remove(contact);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("status-change/{id}")]
        public IActionResult StatusChange(string id, [FromBody]string newStatus)
        {
            var _contact = _db.Contacts.Find(id);
            if (_contact == null)
                return BadRequest();
;
            _contact.Status = newStatus;
            _db.SaveChanges();

            return Ok(_contact);
        }
        [HttpPut("edit-contact")]
        public IActionResult EditContact([FromBody] Contact editedContact)
        {
            var _contact = _db.Contacts.Find(editedContact.Id);
            if (_contact == null)
                return BadRequest();

            _contact.Name = editedContact.Name;
            _contact.Surname = editedContact.Surname;
            _contact.Phone = editedContact.Phone;
            _contact.Email = editedContact.Email;
            _contact.Gender = editedContact.Gender;
            _contact.Image = editedContact.Image;
            _contact.Status = editedContact.Status;

            _db.SaveChanges();

            return Ok(_contact);
        }

    }
}
