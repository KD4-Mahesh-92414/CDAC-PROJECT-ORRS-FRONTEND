-- Sample Payment Data for Testing
-- Run this after you have some bookings in your system

-- Insert sample payments for existing bookings
INSERT INTO payments (user_id, booking_id, transaction_id, amount, payment_method, payment_status, payment_date, gateway_response, refund_amount, refund_date, created_at, updated_at)
SELECT 
    b.user_id,
    b.booking_id,
    CONCAT('TXN', LPAD(b.booking_id, 8, '0')),
    b.total_fare,
    'UPI',
    'SUCCESS',
    b.booking_date,
    'Payment successful via UPI',
    0.00,
    NULL,
    NOW(),
    NOW()
FROM bookings b
WHERE b.status = 'CONFIRMED'
AND NOT EXISTS (SELECT 1 FROM payments p WHERE p.booking_id = b.booking_id);

-- Insert some refund examples
INSERT INTO payments (user_id, booking_id, transaction_id, amount, payment_method, payment_status, payment_date, gateway_response, refund_amount, refund_date, created_at, updated_at)
SELECT 
    b.user_id,
    b.booking_id,
    CONCAT('REF', LPAD(b.booking_id, 8, '0')),
    0.00,
    'UPI',
    'REFUNDED',
    b.booking_date,
    'Refund processed',
    b.total_fare * 0.8, -- 80% refund (20% cancellation charges)
    DATE_ADD(b.booking_date, INTERVAL 1 DAY),
    NOW(),
    NOW()
FROM bookings b
WHERE b.status = 'CANCELLED'
AND NOT EXISTS (SELECT 1 FROM payments p WHERE p.booking_id = b.booking_id AND p.payment_status = 'REFUNDED')
LIMIT 5; -- Only create 5 sample refunds