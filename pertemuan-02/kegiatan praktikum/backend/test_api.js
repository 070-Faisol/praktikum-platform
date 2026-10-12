const http = require('http');
const app = require('./src/app');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  async function request(path, options = {}, body = null) {
    return new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}${path}`, options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });
      req.on('error', reject);
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  console.log('=== RUNNING API ROUTING TESTS ===\n');

  try {
    // 1. GET /api/v1
    let r1 = await request('/api/v1');
    console.log('Test 1 - GET /api/v1:', r1.status, JSON.stringify(r1.data));

    // 2. GET /api/v1/jadwal?status=aktif
    let r2 = await request('/api/v1/jadwal?status=aktif');
    console.log('Test 2 - GET /api/v1/jadwal?status=aktif:', r2.status, JSON.stringify(r2.data));

    // 3. GET /api/v1/jadwal/jumlah-jadwal
    let r3 = await request('/api/v1/jadwal/jumlah-jadwal');
    console.log('Test 3 - GET /api/v1/jadwal/jumlah-jadwal:', r3.status, JSON.stringify(r3.data));

    // 4. GET /api/v1/jadwal/abc
    let r4 = await request('/api/v1/jadwal/abc');
    console.log('Test 4 - GET /api/v1/jadwal/abc:', r4.status, JSON.stringify(r4.data));

    // 5. GET /api/v1/jadwal/99
    let r5 = await request('/api/v1/jadwal/99');
    console.log('Test 5 - GET /api/v1/jadwal/99:', r5.status, JSON.stringify(r5.data));

    // 6. POST /api/v1/jadwal
    let r6 = await request('/api/v1/jadwal', { method: 'POST', headers: { 'Content-Type': 'application/json' } }, { mataKuliah: 'Keamanan Aplikasi', status: 'aktif' });
    console.log('Test 6 - POST /api/v1/jadwal:', r6.status, JSON.stringify(r6.data));

    // 7. PUT /api/v1/jadwal/1
    let r7 = await request('/api/v1/jadwal/1', { method: 'PUT', headers: { 'Content-Type': 'application/json' } }, { status: 'selesai' });
    console.log('Test 7 - PUT /api/v1/jadwal/1:', r7.status, JSON.stringify(r7.data));

    // 8. DELETE /api/v1/jadwal/3
    let r8 = await request('/api/v1/jadwal/3', { method: 'DELETE' });
    console.log('Test 8 - DELETE /api/v1/jadwal/3:', r8.status, JSON.stringify(r8.data));

    // 9. GET /api/v1/jadwal/1/peserta
    let r9 = await request('/api/v1/jadwal/1/peserta');
    console.log('Test 9 - GET /api/v1/jadwal/1/peserta:', r9.status, JSON.stringify(r9.data));

    // 10. GET /api/v1/jadwal/1/peserta/101
    let r10 = await request('/api/v1/jadwal/1/peserta/101');
    console.log('Test 10 - GET /api/v1/jadwal/1/peserta/101:', r10.status, JSON.stringify(r10.data));

    // 11. GET /api/v1/jadwal/1/peserta/103
    let r11 = await request('/api/v1/jadwal/1/peserta/103');
    console.log('Test 11 - GET /api/v1/jadwal/1/peserta/103:', r11.status, JSON.stringify(r11.data));

    // 12. POST /api/v1/jadwal/2/peserta
    let r12 = await request('/api/v1/jadwal/2/peserta', { method: 'POST', headers: { 'Content-Type': 'application/json' } }, { nim: '2026004', nama: 'Damar' });
    console.log('Test 12 - POST /api/v1/jadwal/2/peserta:', r12.status, JSON.stringify(r12.data));

    // 13. GET /api/v1/jadwal/99/peserta
    let r13 = await request('/api/v1/jadwal/99/peserta');
    console.log('Test 13 - GET /api/v1/jadwal/99/peserta:', r13.status, JSON.stringify(r13.data));

    // 14. GET /api/v1/alamat-salah
    let r14 = await request('/api/v1/alamat-salah');
    console.log('Test 14 - GET /api/v1/alamat-salah:', r14.status, JSON.stringify(r14.data));

    console.log('\nALL TESTS EXECUTED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test failed with error:', err);
  } finally {
    server.close();
  }
});
