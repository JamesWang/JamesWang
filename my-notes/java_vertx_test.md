### Vert.x test
  ```
    @ExtendWith(VertxExtension.class)
    public class ToBeTested {
      @BeforeEach
      void prepare(Vertx vertx) {
        ...
        vertx.deployVerticle(xxx);
      }

      @Test
      public void testA(){
        ...
        testContext.verify() -> {
          ...
        }
        testContext.completeNow();
      }
    }
  ```
