require "rubygems"
gem "test-unit"
require "test/unit"

class TC_good_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_01
	_varActual = `node ./liri.js movie-this The Matrix`
	_varExpected = File.read("./tests/expectedResults/expout1.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_02
	_varActual = `node ./liri.js movie-this The Goonies`
	_varExpected = File.read("./tests/expectedResults/expout2.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_03
	_varActual = `node ./liri.js movie-this ET`
	_varExpected = File.read("./tests/expectedResults/expout3.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_04
	_varActual = `node ./liri.js movie-this Short Circuit`
	_varExpected = File.read("./tests/expectedResults/expout4.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_05
	_varActual = `node ./liri.js movie-this The Passion Of The Christ`
	_varExpected = File.read("./tests/expectedResults/expout5.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

class TC_bad_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_06
	_varActual = `node ./liri.js movie-this jklkno`
	_varExpected = File.read("./tests/expectedResults/expout6.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_07
	_varActual = `node ./liri.js movie-this E5,df5`
	_varExpected = File.read("./tests/expectedResults/expout7.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_08
	_varActual = `node ./liri.js movie-this %34534`
	_varExpected = File.read("./tests/expectedResults/expout8.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

class TC_no_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_09
	_varActual = `node ./liri.js movie-this`
	_varExpected = File.read("./tests/expectedResults/expout9.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

