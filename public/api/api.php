<?php

class MyApi
{
	/**
	 * Object containing all incoming request params
	 * @var object
	 */
	private $request;


	public function __construct()
	{
		$this->_processRequest();
	}

	/**
	 * Static method to connect to database
	 */
	private static function conn() {
    	$servername = 'localhost';
    	$database = 'big_bucket';
    	$username = 'root';
    	$password = '';

    	try {
    		$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	} catch(PDOException $e) {
    		echo "Connection failed: " . $e->getMessage();
    		die();
    	}

    	return $conn;
    }

	/**
	 * Static method to connect to database
	 */
	private static function fillDB() {
		$conn = self::conn();

        $stmt = $conn->prepare(
            "SHOW TABLES"
        );
    	$stmt->execute();
    	$result = $stmt->fetchAll();

        if($result == null) {
        	$stmt = $conn->prepare(
                "CREATE TABLE bucket (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    filename varchar(200) COLLATE utf8_unicode_ci NOT NULL,
                    path varchar(200) COLLATE utf8_unicode_ci NOT NULL,
                    purchased bit(1) NOT NULL DEFAULT b'0',
                    PRIMARY KEY (id)
                ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci"
            );
        	$result = $stmt->execute();

            $stmt = $conn->prepare(
                "insert  into bucket(id,filename,path,purchased) values (1,'Dishonored','https://assets.vg247.com/current//2014/07/dishonored-wide.jpg','\0'),(2,'Uncharted','http://media1.gameinformer.com/filestorage/CommunityServer.Components.SiteFiles/imagefeed/featured/sony2016/naughtydog/uncharted4/review/unchartedreinerreivew.jpg','\0'),(3,'The Last of Us','http://blog.dailymotion.com/en/files/the-last-of-us-video-game.jpg','\0'),(4,'The Witcher','http://www.notjustjewels.com/wp-content/uploads/2017/03/Exoticdream-Real-Shark-Tooth-Necklace-Surfer-Hawaiian-Beach-Boys-Girls-Men-Color-White-Bone-blueblack-0-0-480x300.jpg','\0'),(5,'Star Wars','http://cdn.images.express.co.uk/img/dynamic/143/590x/secondary/Darth-Vader-Star-Wars-Battlefront-Star-Wars-Respawn-Titanfall-2-Star-Wars-Game-530930.jpg','\0'),(6,'Infamous','http://collider.com/wp-content/uploads/infamous-image1.jpg','\0'),(7,'Mass Effect','http://cdn.akamai.steamstatic.com/steam/apps/24980/extras/ME.jpg','\0'),(8,'Batman Arkham Knight','http://digitalspyuk.cdnds.net/14/25/768x432/gallery_gaming-batman-arkham-knight-screenshot-7.jpg','\0')"
            );
        	$result = $stmt->execute();
        }
    }

	/**
	 * Get the images information from database to fill the HomePage
	 */
	public function getImages()
	{
        $conn = self::fillDB();
		$conn = self::conn();

    	$stmt = $conn->prepare(
            "SELECT *
                FROM bucket
                WHERE purchased = 0"
        );
    	$stmt->execute();
    	$result = $stmt->fetchAll();
		$this->reply($result);
	}

	/**
	 * Get the selected images for purchase
	 */
	public function getSelectedImages()
	{
		$conn = self::conn();
		$img = $_GET['imgs'];
    	$stmt = $conn->prepare(
            "SELECT *
                FROM bucket
                WHERE id in ($img)"
        );
    	$stmt->execute();
    	$result = $stmt->fetchAll();
		$this->reply($result);
	}

	/**
	 * Update the images as purchased
	 */
	public function buyImages()
	{
		$conn = self::conn();
		$img = $_GET['imgs'];
    	$stmt = $conn->prepare(
            "UPDATE bucket
                SET purchased = 1
                WHERE id in ($img)"
        );
    	$result = $stmt->execute();
		$this->reply($result);
	}

    /**
	 * Update all images as not purchased
	 */
	public function restoreImages()
	{
		$conn = self::conn();
    	$stmt = $conn->prepare(
            "UPDATE bucket
                SET purchased = 0"
        );
    	$result = $stmt->execute();
		$this->reply($result);
	}

	/**
	 * Routes incoming requests to the corresponding method
	 *
	 * Converts $_REQUEST to an object, then checks for the given action and
	 * calls that method. All the request parameters are stored under
	 * $this->request.
	 */
	private function _processRequest()
	{
		// get the request
		if (!empty($_REQUEST)) {
			// convert to object for consistency
			$this->request = json_decode(json_encode($_REQUEST));
		} else {
			// already object
			$this->request = json_decode(file_get_contents('php://input'));
		}

		// get the action
		$action = $this->request->action;

		if (empty($action)) {
			$message = array('error' => 'No method given.');
			$this->reply($message, 400);
		} else {
			// call the corresponding method
			if (method_exists($this, $action)) {
				$this->$action();
			} else {
				$message = array('error' => 'Method not found.');
				$this->reply($message, 400);
			}
		}
	}

	/**
	 * Returns JSON data with HTTP status code
	 *
	 * @param  array $data - data to return
	 * @param  int $status - HTTP status code
	 * @return JSON
	 */
	private function reply($data, $status = 200)
	{
        $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1');
        header($protocol . ' ' . $status);
		header('Content-Type: application/json');
		echo json_encode($data);
		exit;
	}
}

$MyApi = new MyApi();
