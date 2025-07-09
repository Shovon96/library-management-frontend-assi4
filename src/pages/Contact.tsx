import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <Card className="max-w-2xl w-full shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl text-center text-fuchsia-600">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <MapPin className="text-blue-500" />
                        <div>
                            <p className="font-semibold">Our Address</p>
                            <p className="text-gray-600">123 Book Street, Library City, Knowledge State</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Phone className="text-green-500" />
                        <div>
                            <p className="font-semibold">Phone</p>
                            <p className="text-gray-600">+1 234 567 890</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Mail className="text-red-500" />
                        <div>
                            <p className="font-semibold">Email</p>
                            <p className="text-gray-600">support@bookshelf.com</p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <p className="text-sm text-gray-500 text-center">We typically respond within 1–2 business days.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
