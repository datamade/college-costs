'use strict';

var fetch = require( '../dispatchers/get-api-values' );
var numberToWords = require( 'number-to-words' );


var getSchoolValues = {
  def: 0,

  init: function( iped, pid ) {
    this.def = $.Deferred();
    var values = {};
    $.when( fetch.schoolData( iped ), fetch.programData( iped, pid ) )
      .done( function( schoolData, programData ) {
        $.extend( values, schoolData[0], programData[0] );
        values = getSchoolValues.processAPIData( values );
        values = getSchoolValues.getBLSExpenses( values );
        getSchoolValues.def.resolve( values );
      } );
    return this.def.promise();
  },

  /**
   * Fixes certain API values for use in this app
   */
  processAPIData: function( values ) {
    values.programLength /= 12;
    values.defaultRate /= 100;
    values.medianSalary = values.salary || values.medianAnnualPay;
    values.monthlySalary = Math.round( Number( values.medianSalary ) / 12 ).toFixed( 0 );
    values.getMedianSchoolDebt = values.medianStudentLoanCompleters || values.medianTotalDebt
    if ( values.completionRate !== 'None' ) {
      values.gradRate = values.completionRate;
    }

    return values;
  },


  getBLSExpenses: function( values ) {
    // BLS expense data is delivered as annual values.
    // The tool displays monthly expenses.

    if ( window.hasOwnProperty( 'nationalData' ) ) {
      if ( window.nationalData.region === 'Not available' ) {
        values.BLSAverage = 'national';
        values.monthlyRent = window.nationalData.nationalHousing / 12;
        values.monthlyFood = window.nationalData.nationalFood / 12;
        values.monthlyTransportation =
          window.nationalData.nationalTransportation / 12;
        values.monthlyInsurance = window.nationalData.nationalHealthcare / 12;
        values.monthlySavings = window.nationalData.nationalRetirement / 12;
        values.monthlyOther =
          window.nationalData.nationalEntertainment / 12;
      } else {
        values.BLSAverage = window.nationalData.region + ' regional';
        values.monthlyRent = window.nationalData.regionalHousing / 12;
        values.monthlyFood = window.nationalData.regionalFood / 12;
        values.monthlyTransportation =
          window.nationalData.regionalTransportation / 12;
        values.monthlyInsurance = window.nationalData.regionalHealthcare / 12;
        values.monthlySavings = window.nationalData.regionalRetirement / 12;
        values.monthlyOther =
          window.nationalData.regionalEntertainment / 12;
      }
    }

    return values;
  }

};

module.exports = getSchoolValues;
