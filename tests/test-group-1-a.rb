require "rubygems"
gem "test-unit"
require "test/unit"

class TC_spotify-this-song_good_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_01
	_varActual = `node ./liri.js spotify-this-song Whiskey River`
	_varExpected = File.read("./tests/expectedResults/expout1.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_02
	_varActual = `node ./liri.js spotify-this-song "Whiskey River"`
	_varExpected = File.read("./tests/expectedResults/expout2.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_03
	_varActual = `node ./liri.js spotify-this-song ET`
	_varExpected = File.read("./tests/expectedResults/expout3.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_04
	_varActual = `node ./liri.js spotify-this-song Short Circuit`
	_varExpected = File.read("./tests/expectedResults/expout4.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_05
	_varActual = `node ./liri.js spotify-this-song The Passion Of The Christ`
	_varExpected = File.read("./tests/expectedResults/expout5.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

class TC_spotify-this-song__bad_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_06
	_varActual = `node ./liri.js spotify-this-song jklkno`
	_varExpected = File.read("./tests/expectedResults/expout6.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_07
	_varActual = `node ./liri.js spotify-this-song E5,df5`
	_varExpected = File.read("./tests/expectedResults/expout7.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end
  
  def test_08
	_varActual = `node ./liri.js spotify-this-song %34534`
	_varExpected = File.read("./tests/expectedResults/expout8.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

class TC_spotify-this-song__no_input_command_line < Test::Unit::TestCase
  # def setup
  # end

  def test_09
	_varActual = `node ./liri.js spotify-this-song`
	_varExpected = File.read("./tests/expectedResults/expout9.txt")
    assert_equal(_varExpected, _varActual, "The output didn't match expected output.")
  end

  # def teardown
  # end

end

