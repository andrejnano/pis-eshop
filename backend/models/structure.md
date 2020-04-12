

Product {}
Order {}
Configuration {}


```javascript

Products:
- { productID: 1, description: "Ubuntu 2GB 1 vCPU", presetConfigurationID: 3 }
- { productID: 2, description: "CS:GO 4GB 2 vCPU", presetConfigurationID: 8 }
- { productID: 3, description: "Minecraft 3GB 1 vCPU", presetConfigurationID: 5 }
- { productID: 4, description: "Custom", presetConfigurationID: null }

Configurations:
- { configurationID: 1, memory: "1GB", cpu: "1 vCPU", price: "5$" }
- { configurationID: 2, memory: "1GB", cpu: "2 vCPU", price: "10$" }
- { configurationID: 3, memory: "2GB", cpu: "1 vCPU", price: "10$" }
- { configurationID: 4, memory: "2GB", cpu: "2 vCPU", price: "15$" }
- { configurationID: 5, memory: "3GB", cpu: "1 vCPU", price: "15$" }
- { configurationID: 6, memory: "3GB", cpu: "2 vCPU", price: "20$" }
- { configurationID: 7, memory: "4GB", cpu: "1 vCPU", price: "25$" }
- { configurationID: 8, memory: "4GB", cpu: "2 vCPU", price: "30$" }

Orders:
- { orderID: 42, orderItems: [ 123, 124, 125 ], totalPrice: "70$" } // 30 + 15 + 25

OrderItems:
- { orderItemID: 123, orderID: 42, productID: 2, configurationID: 8 }
- { orderItemID: 124, orderID: 42, productID: 3, configurationID: 5 }
- { orderItemID: 125, orderID: 42, productID: 4, configurationID: 7 } // Custom + configuration 7 (4GB 1 vCPU)

```