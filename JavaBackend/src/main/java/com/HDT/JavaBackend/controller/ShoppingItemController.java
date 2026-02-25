package com.HDT.JavaBackend.controller;

import com.HDT.JavaBackend.model.ShoppingItem;
import com.HDT.JavaBackend.service.ShoppingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shopping")
@CrossOrigin(origins = "http://localhost:5173")
public class ShoppingItemController {

    @Autowired
    private ShoppingItemService shoppingItemService;

    // GET all shopping items → displays in table
    @GetMapping
    public List<ShoppingItem> getAllItems() {
        return shoppingItemService.getAllItems();
    }

    // POST a new item → React sends item + quantity here
    @PostMapping
    public ShoppingItem createItem(@RequestBody ShoppingItem item) {
        return shoppingItemService.createItem(item);
    }

    // DELETE an item → triggered by delete button in table row
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        shoppingItemService.deleteItem(id);
    }
}