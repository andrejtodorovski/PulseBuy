import { Module } from '@nestjs/common';
import { SystemAnalyticsService } from './system-analytics.service';
import { SystemAnalyticsController } from './system-analytics.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemAnalyticsView } from "./system-analytics-view";

@Module({
  imports: [TypeOrmModule.forFeature([SystemAnalyticsView])],
  controllers: [SystemAnalyticsController],
  providers: [SystemAnalyticsService],
})
export class SystemAnalyticsModule {}
