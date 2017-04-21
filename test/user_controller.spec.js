var assert = require('chai').assert;
var request = require('supertest');
var models = require('../models');
var db = require('../models/db');
var User = models.User;
var mongoose = require('mongoose')
var url = 'http://localhost:1338';



describe("user controller" , function(){
	describe( 'signup Api', function() {
		before(function (done) {
			    User.remove({}).then(function(){
			    	request(url)
					  .get('/api/logout')
					  .send(this.user)
					  .end(function(err, res) {
					    if (err) throw err;
					    done();
					  });
			    })
		});

		describe('For creating sucessful user' , function(){
			before(function() {
                this.user = {
                    "name": "Surajit Barman",
                    "password": "surajitbar",
                    "confirm_password": "surajitbar",
                    "email": "surajit.barman@gmail.com",
                }
            });


            it('should create a new user', function(done) {
                request(url)
                    .post('/signup')
                    .send(this.user)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end(function(err, res) {
                        if (err) throw err;
                        done();
                    });
            });

		});
	})
})