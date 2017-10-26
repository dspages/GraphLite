  # Table users

  -username

  -password_digest

  -session_token

  -id

  # Table datafiles

  -user_id (foreign key for creator)

  -filename (location of the data file on the server)

  -title

  -public (boolean, controls whether all users can see it)

  -id

  # Table shares (join table)

  -user_id

  -datafile_id

  -id

  # Table graphs

  -user_id

  -datafile_id

  -title

  -x_axis

  -y_axis

  -type

  -filter

  -id
