import { interceptedFetch } from "../helpers/helpers";
import type { CreateReviewDto } from "../models/review";

class ReviewRepository {
    fetchReviewsForProduct = (productId: string): Promise<Response> => {
        return interceptedFetch(`/review/product/${productId}`, {});
    }

    addNewReview = (createReviewDto: CreateReviewDto): Promise<Response> => {
        return interceptedFetch("/review", {
            method: "POST",
            body: JSON.stringify(createReviewDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    getAverageRating = (productId: string): Promise<Response> => {
        return interceptedFetch(`/review/average/${productId}`, {});
    }
}

export default new ReviewRepository();