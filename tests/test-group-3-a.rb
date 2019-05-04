require "rubygems"
gem "test-unit"
require "test/unit"

class TC_testgroup3a < Test::Unit::TestCase
  # def setup
  # end

  def test_01
	_varActual = `node ../liri.js movie-this The Matrix`
	_varExpected = File.read("./expectedResults/expout1.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_02
	_varActual = `node ../liri.js movie-this The Goonies`
	_varExpected = File.read("./expectedResults/expout2.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_03
	_varActual = `node ../liri.js movie-this ET`
	_varExpected = File.read("./expectedResults/expout3.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_04
	_varActual = `node ../liri.js movie-this Short Circuit`
	_varExpected = File.read("./expectedResults/expout4.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_05
	_varActual = `node ../liri.js movie-this The Passion Of The Christ`
	_varExpected = File.read("./expectedResults/expout5.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

