/**
 * Created by Xavok on 4/7/2017.
 */
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((e) => {
    return new Meteor.Error(400,e.message);
});