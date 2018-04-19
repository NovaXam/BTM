package controllers;


import com.example.server.controllers.PlaceController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(PlaceController.class)
public class PlacesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void findAllCities_success_returnStatusOk() throws Exception {
        this.mockMvc
                .perform(get("/cities"))
                .andExpect(status().isOk());
    };

    @Test
    public void findAllCities_success_returnCitiesAsJson() throws Exception {
        this.mockMvc
                .perform(get("/cities"))
                .andExpect(jsonPath("$", hasSize(2)));
    };


}
