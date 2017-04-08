/**
 * Created by Xavok on 4/5/2017.
 */
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;
    console.log(user);
    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({email});
    return true;
});