use job::Job;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U64;
use near_sdk::near_bindgen;
use near_sdk::BorshStorageKey;

mod job;
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Upwork {
    pub total_jobs: U64,
    pub job_list: LookupMap<U64, Job>,
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    JobList,
}

impl Default for Upwork {
    fn default() -> Self {
        Self {
            job_list: LookupMap::new(StorageKeys::JobList),
            total_jobs: U64(0),
        }
    }
}

#[near_bindgen]
impl Upwork {
    pub fn get_work(&self, work_id: U64) -> Option<Job> {
        self.job_list.get(&work_id)
    }

    #[payable]
    pub fn create_work(&mut self, title: String, metadata: String) -> U64 {
        let work_id = self.total_jobs.0;
        self.job_list
            .insert(&U64::from(work_id), &Job { title, metadata });
        self.total_jobs.0 += 1;
        U64(work_id)
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {

    // // Allows for modifying the environment of the mocked blockchain
    // fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
    //     let mut builder = VMContextBuilder::new();
    //     builder
    //         .current_account_id(accounts(0))
    //         .signer_account_id(predecessor_account_id.clone())
    //         .predecessor_account_id(predecessor_account_id);
    //     builder
    // }

    // #[test]
    // fn set_get_message() {
    //     let mut context = get_context(accounts(1));
    //     // Initialize the mocked blockchain
    //     testing_env!(context.build());

    //     // Set the testing environment for the subsequent calls
    //     testing_env!(context.predecessor_account_id(accounts(1)).build());

    //     let mut contract = Upwork::default();
    //     contract.set_status("hello".to_string());
    //     assert_eq!(
    //         "hello".to_string(),
    //         contract.get_status(accounts(1)).unwrap()
    //     );
    // }

    // #[test]
    // fn get_nonexistent_message() {
    //     let contract = Upwork::default();
    //     assert_eq!(None, contract.get_status("francis.near".parse().unwrap()));
    // }
}
