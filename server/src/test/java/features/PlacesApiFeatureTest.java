package features;

import com.example.server.models.Place;
import com.example.server.repositories.PlaceRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.*;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class PlacesApiFeatureTest {

    @Autowired
    private PlaceRepository placeRepository;

    @Before
    public void setUp() {
        placeRepository.deleteAll();
    };

    @After
    public void tearDown() {
        placeRepository.deleteAll();
    };

    @Test
    public void shouldAllowFullCrudForAPlace() throws Exception {

        Place firstPlace = new Place("helsinki");

        Place secondPlace = new Place("oslo");

        Stream.of(firstPlace, secondPlace)
                .forEach(place -> {
                    placeRepository.save(place);
                });

        // Test get all Places
        when()
                .get("http://localhost:8080/cities")
                .then()
                .statusCode(is(200))
                .and().body(containsString("helsinki"))
                .and().body(containsString("oslo"));


        //Test creating place
        Place newPlace = new Place("Lisabon");

        given()
                .contentType(JSON)
                .and().body(newPlace)
                .when()
                .post("http://localhost:8080/cities")
                .then()
                .statusCode(is(200))
                .and().body(containsString("lisabon"));

        //Test get all places
        when()
                .get("http://localhost:8080/cities")
                .then()
                .statusCode(is(200))
                .and().body(containsString("lisabon"))
                .and().body(containsString("oslo"))
                .and().body(containsString("helsinki"));


        //Test get places by ID
         when()
                .get("http://localhost:8080/cities/" + secondPlace.getCity_id())
                .then()
                .statusCode(is(200))
                .and().body(containsString("oslo"));

        //Test update place by ID
        secondPlace.setCityName("copenhagen");
        given()
                .contentType(JSON)
                .and().body(secondPlace)
                .when()
                .post("http://localhost:8080/places/" + secondPlace.getCity_id())
                .then()
                .statusCode(is(200))
                .and().body(containsString("copenhagen"));

        //Test deleting place by ID
        when()
                .delete("http://localhost:8080/places" + firstPlace.getCity_id())
                .then()
                .statusCode(is(200));
    };
}