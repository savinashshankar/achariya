import { faker } from '@faker-js/faker';

// --- Types ---

export interface DigitalRequest {
    id: string;
    request_type: 'Website update' | 'Social media campaign' | 'YouTube thumbnail design' | 'Automation workflow' | 'Landing page for admissions' | 'Design' | 'Video' | 'Other';
    department: 'Admissions' | 'Marketing' | 'IT' | 'Academic' | 'Management';
    requested_by: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'New' | 'In Progress' | 'On Hold' | 'Completed' | 'Rejected';
    created_at: string;
    due_date: string;
    assigned_to: string;
    description: string;
    comments: { user: string; text: string; date: string }[];
    timeline: { status: string; date: string }[];
}

export interface AdmissionLead {
    lead_id: string;
    student_name: string;
    parent_name: string;
    email: string;
    phone: string;
    source: 'Website' | 'Walk in' | 'WhatsApp' | 'Referral' | 'Campaign';
    campus: 'ASM' | 'ABSM' | 'SSV' | 'AASC' | 'ACET';
    grade_applied: string;
    status: 'New' | 'Contacted' | 'Campus Visit' | 'Application Submitted' | 'Enrolled' | 'Closed';
    counselor: string;
    created_at: string;
    last_contact_date: string;
    probability_score: number;
}

export interface ITAsset {
    asset_id: string;
    asset_type: 'Senses Panel' | 'Projector' | 'Camera' | 'Laptop' | 'Printer';
    campus: 'ASM' | 'ABSM' | 'SSV' | 'AASC' | 'ACET';
    room_no: string;
    serial_no: string;
    vendor_name: string;
    condition: 'Working' | 'Needs Service' | 'Not Working';
    purchase_date: string;
    installation_date: string;
    warranty_expiry_date: string;
    last_serviced_date: string;
    next_service_date: string;
    amc_status: 'Active' | 'Expired' | 'Not Covered';
    last_updated: string;
    service_history: { date: string; description: string; technician: string }[];
}

// --- Generators ---

const generateDigitalRequests = (count: number): DigitalRequest[] => {
    const requests: DigitalRequest[] = [];
    for (let i = 0; i < count; i++) {
        const createdDate = faker.date.recent({ days: 30 });
        const dueDate = faker.date.future({ years: 0.1, refDate: createdDate });

        requests.push({
            id: `DR-2025-${String(i + 1).padStart(4, '0')}`,
            request_type: faker.helpers.arrayElement(['Website update', 'Social media campaign', 'YouTube thumbnail design', 'Automation workflow', 'Landing page for admissions', 'Design', 'Video', 'Other']),
            department: faker.helpers.arrayElement(['Admissions', 'Marketing', 'IT', 'Academic', 'Management']),
            requested_by: faker.person.firstName(),
            priority: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
            status: faker.helpers.arrayElement(['New', 'In Progress', 'On Hold', 'Completed', 'Rejected']),
            created_at: createdDate.toISOString().split('T')[0],
            due_date: dueDate.toISOString().split('T')[0],
            assigned_to: faker.person.firstName(),
            description: faker.lorem.paragraph(),
            comments: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
                user: faker.person.firstName(),
                text: faker.lorem.sentence(),
                date: faker.date.recent({ days: 5 }).toISOString().split('T')[0],
            })),
            timeline: [
                { status: 'New', date: createdDate.toISOString().split('T')[0] },
            ],
        });
    }
    return requests;
};

const generateAdmissionLeads = (count: number): AdmissionLead[] => {
    const leads: AdmissionLead[] = [];
    for (let i = 0; i < count; i++) {
        leads.push({
            lead_id: `AL-2025-${String(i + 101).padStart(4, '0')}`,
            student_name: faker.person.fullName(),
            parent_name: faker.person.firstName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            source: faker.helpers.arrayElement(['Website', 'Walk in', 'WhatsApp', 'Referral', 'Campaign']),
            campus: faker.helpers.arrayElement(['ASM', 'ABSM', 'SSV', 'AASC', 'ACET']),
            grade_applied: faker.helpers.arrayElement(['Grade 1', 'Grade 5', 'Grade 8', 'Grade 10', 'Grade 12', 'BSc CS', 'BE CSE', 'BCom']),
            status: faker.helpers.arrayElement(['New', 'Contacted', 'Campus Visit', 'Application Submitted', 'Enrolled', 'Closed']),
            counselor: faker.helpers.arrayElement(['Meera', 'Rahul', 'Anitha', 'Suresh', 'Divya']),
            created_at: faker.date.recent({ days: 60 }).toISOString().split('T')[0],
            last_contact_date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
            probability_score: faker.number.int({ min: 0, max: 100 }),
        });
    }
    return leads;
};

const generateITAssets = (count: number): ITAsset[] => {
    const assets: ITAsset[] = [];
    for (let i = 0; i < count; i++) {
        const purchaseDate = faker.date.past({ years: 3 });
        const installDate = new Date(purchaseDate);
        installDate.setDate(installDate.getDate() + 5);
        const warrantyDate = new Date(purchaseDate);
        warrantyDate.setFullYear(warrantyDate.getFullYear() + 3);

        assets.push({
            asset_id: `IT-SP-${String(i + 1).padStart(4, '0')}`,
            asset_type: 'Senses Panel', // Focusing on Senses Panels as requested
            campus: faker.helpers.arrayElement(['ASM', 'ABSM', 'SSV', 'AASC', 'ACET']),
            room_no: `Room ${faker.number.int({ min: 100, max: 500 })}`,
            serial_no: `SP-${faker.string.alphanumeric(10).toUpperCase()}`,
            vendor_name: faker.helpers.arrayElement(['VendorTech Systems', 'EduScreen Pvt Ltd', 'ClassTech Solutions']),
            condition: faker.helpers.arrayElement(['Working', 'Needs Service', 'Not Working']),
            purchase_date: purchaseDate.toISOString().split('T')[0],
            installation_date: installDate.toISOString().split('T')[0],
            warranty_expiry_date: warrantyDate.toISOString().split('T')[0],
            last_serviced_date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
            next_service_date: faker.date.future({ years: 1 }).toISOString().split('T')[0],
            amc_status: faker.helpers.arrayElement(['Active', 'Expired', 'Not Covered']),
            last_updated: faker.date.recent({ days: 10 }).toISOString().split('T')[0],
            service_history: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
                date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
                description: 'Routine maintenance',
                technician: faker.person.fullName(),
            })),
        });
    }
    return assets;
};

// --- Seed Data ---

export const digitalRequestsData = generateDigitalRequests(60);
export const admissionLeadsData = generateAdmissionLeads(80);
export const itAssetsData = generateITAssets(50);
