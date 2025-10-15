<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");

if (empty($_COOKIE['info'])) {
    $count = 1;
    setcookie('info[msg]', $count, 0, '/', $_SERVER['SERVER_NAME'], false, true);
} else {
    $count = $_COOKIE['info']['msg'] + 1;
    setcookie('info[msg]', $count, 0, '/', $_SERVER['SERVER_NAME'], false, true);
}
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQLITE3 | MiPhant</title>
</head>

<body>
    <?php
    $pathDados = dirname(__FILE__) . '/dados/';
    if (!file_exists($pathDados)) {
        mkdir($pathDados);
    }

    // Creates the database and the table
    $db1 = new SQLite3($pathDados . '/example.sqlite');
    $db1->exec("CREATE TABLE IF NOT EXISTS mi_example (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)");
    $db1->close();

    // Insert records
    $db2 = new SQLite3($pathDados . '/example.sqlite', SQLITE3_OPEN_READWRITE);
    if (empty($_COOKIE['info'])) {
        $db2->query("INSERT INTO mi_example (name) VALUES ('" . $count . "')");
    } else {
        if ($stmt = $db2->prepare("INSERT INTO mi_example (name) VALUES (:name)")) {
            $stmt->bindParam(':name', $count);
            $stmt->execute();
            $stmt->close();
        }
    }
    $db2->close();

    echo '<p><a href="javascript:window.location.reload();">Update Page</a></p>';

    // Check records
    $db3 = new SQLite3($pathDados . '/example.sqlite', SQLITE3_OPEN_READONLY);
    $query = $db3->query('SELECT * FROM mi_example ORDER BY id DESC');
    while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
        echo $row['name'] . '<br>';
    }
    $db3->close();
    ?>
</body>

</html>