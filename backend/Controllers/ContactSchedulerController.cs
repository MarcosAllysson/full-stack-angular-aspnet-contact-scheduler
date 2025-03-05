using backend.Classes;
using backend.Data;
using backend.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ContactSchedulerController : ControllerBase
    {
        private readonly ContactSchedulerDbContext _dbContext;
        private readonly ILogger<ContactSchedulerController> _logger;

        public ContactSchedulerController(ILogger<ContactSchedulerController> logger, ContactSchedulerDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactResponse>>> GetContactsAsync()
        {
            try
            {
                var contacts = await _dbContext.Contacts
                    .AsNoTracking()
                    .Where(c => c.IsActive)
                    .OrderByDescending(c => c.Id)
                    .Select(c => new ContactResponse(
                        c.Id,
                        c.Name,
                        c.Email,
                        c.CellPhone,
                        c.Phone,
                        c.IsFavorite,
                        c.IsActive,
                        c.CreatedAt,
                        c.UpdatedAt)
                    )
                    .ToListAsync();

                return Ok(contacts);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error retrieving contacts: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ContactResponse>>> SearchContactsAsync(string query)
        {
            try
            {
                IQueryable<Contact> contactsQuery = _dbContext.Contacts
                    .AsNoTracking()
                    .AsQueryable();

                if (!string.IsNullOrEmpty(query))
                {
                    contactsQuery = contactsQuery.Where(c =>
                        c.Name.Contains(query) ||
                        c.Email.Contains(query) ||
                        c.CellPhone.Contains(query) ||
                        c.Phone.Contains(query)
                    );
                }

                var contacts = await contactsQuery
                    .Select(c => new ContactResponse(
                        c.Id,
                        c.Name,
                        c.Email,
                        c.CellPhone,
                        c.Phone,
                        c.IsFavorite,
                        c.IsActive,
                        c.CreatedAt,
                        c.UpdatedAt)
                    )
                    .ToListAsync();

                return Ok(contacts);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error searching contacts: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar contatos");
            }
        }

        [HttpGet("favorites")]
        public async Task<ActionResult<IEnumerable<ContactResponse>>> GetFavoritesAsync()
        {
            try
            {
                var favorites = await _dbContext.Contacts
                    .AsNoTracking()
                    .Where(c => c.IsFavorite && c.IsActive)
                    .Select(c => new ContactResponse(
                        c.Id,
                        c.Name,
                        c.Email,
                        c.CellPhone,
                        c.Phone,
                        c.IsFavorite,
                        c.IsActive,
                        c.CreatedAt,
                        c.UpdatedAt)
                    )
                    .ToListAsync();

                return Ok(favorites);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error retrieving favorite contacts: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao recuperar contatos favoritos");
            }
        }

        [HttpGet("disabled-contacts")]
        public async Task<ActionResult<IEnumerable<ContactResponse>>> GetDisabledContactsAsync()
        {
            try
            {
                var favorites = await _dbContext.Contacts
                    .AsNoTracking()
                    .Where(c => !c.IsActive)
                    .Select(c => new ContactResponse(
                        c.Id,
                        c.Name,
                        c.Email,
                        c.CellPhone,
                        c.Phone,
                        c.IsFavorite,
                        c.IsActive,
                        c.CreatedAt,
                        c.UpdatedAt)
                    )
                    .ToListAsync();

                return Ok(favorites);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error retrieving favorite contacts: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao recuperar contatos favoritos");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ContactResponse>> GetContactAsync(int id)
        {
            try
            {
                var contact = await _dbContext.Contacts
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (contact == null)
                    return NotFound();

                var contactResponse = new ContactResponse(
                    contact.Id,
                    contact.Name,
                    contact.Email,
                    contact.CellPhone,
                    contact.Phone,
                    contact.IsFavorite,
                    contact.IsActive,
                    contact.CreatedAt,
                    contact.UpdatedAt
                );

                return Ok(contactResponse);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error retrieving contact {id}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{cellNumber}/check-cellphone")]
        public async Task<ActionResult<bool>> CellPhoneNumberExistsAsync(string cellNumber)
        {
            try
            {
                var existingCellPhone = await _dbContext.Contacts.AnyAsync(x => x.CellPhone == cellNumber);

                if (existingCellPhone) return true;

                return false;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error retrieving if cell phone exists {cellNumber}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactResponse>> PostContactAsync(ContactRegister contactRegister)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                if (await _dbContext.Contacts.AnyAsync(c => c.CellPhone == contactRegister.CellPhone))
                    return BadRequest("Já existe um contato com este número de celular.");

                var contact = new Contact(
                    contactRegister.Name,
                    contactRegister.Email,
                    contactRegister.CellPhone,
                    contactRegister.Phone,
                    contactRegister.IsFavorite
                );

                await _dbContext.Contacts.AddAsync(contact);

                await _dbContext.SaveChangesAsync();

                return Created();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error creating contact: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar contato");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutContactAsync(int id, ContactUpdate contactDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                if (id != contactDto.Id)
                    return BadRequest();

                var existingContact = await _dbContext.Contacts
                    .FirstOrDefaultAsync(c => c.CellPhone == contactDto.CellPhone && c.Id != id);

                if (existingContact != null)
                    return BadRequest("Já existe outro contato com este número de celular.");

                var dbContact = await _dbContext.Contacts
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (dbContact == null)
                    return NotFound();

                dbContact.Update(
                    contactDto.Name,
                    contactDto.Email,
                    contactDto.CellPhone,
                    contactDto.Phone,
                    contactDto.IsFavorite,
                    contactDto.IsActive
                );

                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException e)
            {
                if (!await ContactExistsAsync(id))
                    return NotFound();
                else
                {
                    _logger.LogError($"Error updating contact {id}: {e.Message} - {e.StackTrace}");
                    return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar contato");
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Error updating contact {id}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar contato");
            }
        }

        [HttpPatch("{id:int}/deactivate")]
        public async Task<IActionResult> DeactivateContactAsync(int id)
        {
            try
            {
                var contact = await _dbContext.Contacts
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (contact == null)
                    return NotFound();

                contact.Deactivate();

                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error deactivating contact {id}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao desativar contato");
            }
        }

        [HttpPatch("{id:int}/activate")]
        public async Task<IActionResult> ActivateContactAsync(int id)
        {
            try
            {
                var contact = await _dbContext.Contacts
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (contact == null)
                    return NotFound();

                contact.Activate();

                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error activating contact {id}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao ativar contato");
            }
        }

        [HttpPatch("{id:int}/toggle-favorite")]
        public async Task<IActionResult> ToggleFavoriteAsync(int id)
        {
            try
            {
                var contact = await _dbContext.Contacts
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (contact == null)
                    return NotFound();

                contact.ToggleFavorite();

                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error toggling favorite for contact {id}: {e.Message} - {e.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao alterar favorito");
            }
        }

        private async Task<bool> ContactExistsAsync(int id) => await _dbContext.Contacts.AnyAsync(e => e.Id == id);
    }
}
