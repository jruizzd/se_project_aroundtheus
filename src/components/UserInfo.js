export default class UserInfo {
  // two elements in constructor one for profile's name element and one for its job element
  constructor({ nameSelector, jobSelector }) {
    // store selectors in instance variables
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }
  // which returns an object containing information about the user. This method will be handy for cases when it's necessary to display the user data in the open form
  // getUserInfo method stick information in the inputs
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  //  which takes new user data and adds it to the page. This method should be used after successful submission of the profile form.
  // setUserInfo method take a string and set string inside to change to something else
  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

//userInfo.setUserInfo("John Smith", "sailor");
