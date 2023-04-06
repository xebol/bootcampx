const { Pool } = require('pg');

const pool = new Pool({
  user: 'xyrelleebol',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const values = [cohort ?? 'JUL02'];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1 
ORDER BY teacher;
`, values)
  .then(response => {
    response.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));