package com.HDT.JavaBackend.service;

import com.HDT.JavaBackend.model.ShoppingItem;
import com.HDT.JavaBackend.repository.ShoppingItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShoppingItemService {

    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    public List<ShoppingItem> getAllItems() {
        return shoppingItemRepository.findAll();
    }

    public ShoppingItem createItem(ShoppingItem item) {
        return shoppingItemRepository.save(item);
    }

    public void deleteItem(Long id) {
        shoppingItemRepository.deleteById(id);
    }
}