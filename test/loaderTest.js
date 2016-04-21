'use strict'

var expect = require('chai').expect;
var sample = require('./../sample/dist/bundle.js')

describe('loader tests', () => {

  it('should properly replace ramda functions', () => {

    expect(sample(10)).to.equal(10)
    expect(sample(32)).to.equal('The answer to your Ramda import problems')

  })

})
