let remindersEnabled = true;

function isRemindersEnabled() {
  return remindersEnabled;
}

function toggleReminders() {

  remindersEnabled = !remindersEnabled;

  return remindersEnabled;
}

module.exports = {
  isRemindersEnabled,
  toggleReminders
};