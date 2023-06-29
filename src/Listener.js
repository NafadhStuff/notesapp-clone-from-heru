class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      console.log(targetEmail);
      console.log(userId);
      const notes = await this._notesService.getNotes(userId);
      const resutl = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(resutl);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
