import app from "./App";
import * as schedule from "node-schedule";
import { createInvoiceService } from "./Services/invoiceService";

(async () => {
  const { default: customerRoute } = await import("./Routes/customerRoute");
  const { default: paymentRoute } = await import("./Routes/paymentRoute");
  const { default: subscriptionRoute } = await import("./Routes/subscriptionRoute");

  customerRoute(app);
  paymentRoute(app);
  subscriptionRoute(app);

  // CRON Job to check and generate Bills every day Automatically
  schedule.scheduleJob("0 0 * * *", async () => {
    // Your cron job logic here
    await createInvoiceService()
  });

  // RUN SERVER :)
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("Server Is Running On Port: " + PORT));
})();
