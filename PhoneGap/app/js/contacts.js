$(function() {
    
    // Cordova is ready
    //

    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    function onDeviceReady() {
      console.log("Showing contacts");
      $('.contact-create-remove').click(createAndRemoveContact);
      $('.contact-create').click(createContact);
      $('.contact-find').click(findContact);
    }

    function createContact() {
      var contact = navigator.contacts.create();
        contact.displayName = "Plumber";
        contact.nickname = "Plumber";       //specify both to support all devices
        var name = new ContactName();
        name.givenName = "Jane";
        name.familyName = "Doe";
        contact.name = name;
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Original contact nickname = " + contact.nickname);

        // save
        contact.save(onSaveSuccess,onSaveError);
    }

    function createAndRemoveContact() {

      var contact = navigator.contacts.create();
        contact.displayName = "Plumber";
        contact.nickname = "Plumber";       //specify both to support all devices
        var name = new ContactName();
        name.givenName = "Jane";
        name.familyName = "Doe";
        contact.name = name;
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Original contact nickname = " + contact.nickname);

        // save
        contact.save(onSaveSuccess,onSaveError);

        // clone
        var clone = contact.clone();
        clone.name.givenName = "John";
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Cloned contact name = " + clone.name.givenName); 

        // remove
        contact.remove(onRemoveSuccess,onRemoveError);
    }

    // onSaveSuccess: Get a snapshot of the current contacts
    //
    function onSaveSuccess(contact) {
        alert("Save Success");
    }

    // onSaveError: Failed to get the contacts
    //
    function onSaveError(contactError) {
        alert("Error = " + contactError.code);
    }

    // onRemoveSuccess: Get a snapshot of the current contacts
    //
    function onRemoveSuccess(contacts) {
        alert("Removal Success");
    }

    // onRemoveError: Failed to get the contacts
    //
    function onRemoveError(contactError) {
        alert("Error = " + contactError.code);
    }



    function findContact() {
        // find all contacts in any name field
        var options = new ContactFindOptions();
        options.filter="";
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Get a snapshot of the current contacts
    //
    function onSuccess(contacts) {
        for (var i=0; i<contacts.length; i++) {
            console.log("Display Name = " + contacts[i].displayName);
        }
    }

    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('onError!');
    }

    onLoad();
});