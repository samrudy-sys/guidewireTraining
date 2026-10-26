package gw.servertest

uses gw.api.databuilder.ABPersonBuilder
uses gw.api.test.ABServerTestClassBase
uses gw.api.util.DateUtil
uses gw.suites.ABExampleServerSuite
uses gw.testharness.v3.Suites
uses trainingapp.demo.gosu.MiscellaneousExamples

uses java.util.Date

@Export
@Suites(ABExampleServerSuite.NAME)
class BirthdayTest extends ABServerTestClassBase {

  function testIsBirthdayInFutureReturnsTrueForFutureDateOfBirth() {
    var person = personBornOn(DateUtil.currentDate().addDays(1))
    assertThat(MiscellaneousExamples.isBirthdayInFuture(person)).isTrue()
  }

  function testIsBirthdayInFutureReturnsFalseForPastDateOfBirth() {
    var person = personBornOn(DateUtil.currentDate().addYears(-30))
    assertThat(MiscellaneousExamples.isBirthdayInFuture(person)).isFalse()
  }

  function testIsBirthdayInFutureReturnsFalseForUnknownDateOfBirth() {
    var person = new ABPersonBuilder().create()
    assertThat(MiscellaneousExamples.isBirthdayInFuture(person)).isFalse()
  }

  function testAgeOnBirthday() {
    var person = personBornOn(DateUtil.currentDate().addYears(-30))
    assertThat(person.Age).isEqualTo("30")
  }

  function testAgeAfterBirthdayThisYear() {
    var person = personBornOn(DateUtil.currentDate().addYears(-30).addDays(-1))
    assertThat(person.Age).isEqualTo("30")
  }

  // 30 years minus a day spans 7-8 leap days, so the old ageInDays / 365 calculation returned "30".
  function testAgeDayBeforeBirthdayAcrossLeapYears() {
    var person = personBornOn(DateUtil.currentDate().addYears(-30).addDays(1))
    assertThat(person.Age).isEqualTo("29")
  }

  // 4 years minus a day always spans 1 leap day, so the old calculation returned "4".
  function testAgeDayBeforeFourthBirthday() {
    var person = personBornOn(DateUtil.currentDate().addYears(-4).addDays(1))
    assertThat(person.Age).isEqualTo("3")
  }

  function testAgeUnknownWhenDateOfBirthIsNull() {
    var person = new ABPersonBuilder().create()
    assertThat(person.Age).isEqualTo("Unknown")
  }

  private function personBornOn(dateOfBirth: Date): ABPerson {
    return new ABPersonBuilder()
        .withDateOfBirth(dateOfBirth)
        .create()
  }

}
