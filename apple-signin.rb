require 'jwt'

key_file = '/Users/davidandcristina/Downloads/AuthKey_6R7MA36DA4.p8'
team_id = 'B76M6DBRAC'
client_id = 'app.namelist.app.serviceId'
key_id = '6R7MA36DA4'

ecdsa_key = OpenSSL::PKey::EC.new IO.read key_file

headers = {
'kid' => key_id
}

claims = {
    'iss' => team_id,
    'iat' => Time.now.to_i,
    'exp' => Time.now.to_i + 86400*180,
    'aud' => 'https://appleid.apple.com',
    'sub' => client_id,
}

token = JWT.encode claims, ecdsa_key, 'ES256', headers

puts token