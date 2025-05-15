import User from "../models/UserModel.js";

// GET USER
async function getUsers(req, res) {
  try {
    // Lakukan query "SELECT * nama_tabel" ke db, simpan ke dalam variabel "users"
    const users = await User.findAll();

    // Kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users, // <- Data seluruh user
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    /*
      Lakukan query "SELECT * nama_tabel WHERE id = id" ke db
      id diambil dari parameter dari endpoint.
      Setelah itu, simpan hasil query ke dalam variabel "user"
    */
    const user = await User.findOne({ where: { id: req.params.id } });

    // Cek user yg diambil ada apa engga
    // Kalo user gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    // Kalo user ada, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user, // <- Data user yg diambil
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    // Ngecek apakah request body lengkap apa engga
    // Kalo kurang lengkap, masuk ke catch degnan error message "Field cannot be empty 😠" (400)
    if (Object.keys(req.body).length < 3) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    /*
      Masukkin user ke DB
      Ini sama aja kaya query:
      INSERT INTO nama_tabel (name, email, gender)
      VALUES (name, email, gender);

      Setelah itu, simpan hasil query ke dalam variabel "newUser"
      Hasil query berupa user baru yg telah berhasil dibuat
    */
    const newUser = await User.create(req.body);

    // Kalo berhasil ngirim respons sukses (201)
    return res.status(201).json({
      status: "Success",
      message: "User Created",
      data: newUser, // <- Data user baru yg ditambahkan
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE USER
async function updateUser(req, res) {
  try {
    const { name, email, gender } = req.body;

    // Ngecek apakah request body lengkap apa engga
    if (Object.keys(req.body).length < 3) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    // Ngecek apakah id user yg diupdate ada apa ga
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    // Kalo gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    /*
      Kalo ada, lakukan query update ke db
      Ini sama aja kaya query:
      UPDATE nama_tabel
      SET name = name, email = email, gender = gender, password = password
      WHERE id = id

      Keterangan:
      Nilai name, email, gender diambil dari req.body
      id diambil dari parameter dari endpoint.

      Hasil query berupa "row affected" disimpan ke dalam variabel "result"
    */
    const result = await User.update(req.body, {
      where: { id: req.params.id },
    });

    /*
      Cek apakah query berhasil atau engga
      Kalo gagal (tidak ada row yg affected), masuk ke catch,
      kasi message "Tidak ada data yang berubah" (400)
    */
    if (result[0] == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    // Kalo berhasil, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    // Ngecek apakah id user yg mau di-delete ada apa ga
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    // Kalo gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    /*
      Kalo ada, lakukan query delete user berdasarkan id ke db
      Ini sama aja kaya DELETE FROM nama_tabel WHERE id = id
      id diambil dari parameter dari endpoint.

      Hasil query berupa row affected disimpan ke dalam variabel "result"
    */
    const result = await User.destroy({ where: { id: req.params.id } });

    /*
      Cek apakah query berhasil atau engga
      Kalo gagal (tidak ada row yg affected), masuk ke catch,
      kasi message "Tidak ada data yang berubah" (400)
    */
    if (result == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    // Kalo berhasil, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
