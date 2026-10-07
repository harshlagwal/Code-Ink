import { FinalAssessment } from '../types/notebook';

export const DBMS_FINAL_ASSESSMENT: FinalAssessment = {
  subjectId: 'dbms',
  title: 'Database Management Systems & SQL Engineering Examination',
  durationMinutes: 90,
  totalMarks: 30,
  totalQuestions: 30,
  sections: {
    sectionA: {
      title: 'Section A: Relational Theory, Models & SQL Primitives',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dbms-a1',
          section: 'A',
          marks: 1,
          topic: 'File Systems vs DBMS',
          question: 'Which of the following is a major advantage of a DBMS over traditional file processing systems?',
          options: ['Manual concurrency locking', 'Physical data isolation without schemas', 'Reduction of data redundancy and inconsistency', 'Direct unbuffered disk block manipulation'],
          correctIndex: 2,
          explanation: 'A central DBMS maintains a unified data dictionary and enforces normalization, eliminating redundant files and data inconsistencies.'
        },
        {
          id: 'dbms-a2',
          section: 'A',
          marks: 1,
          topic: 'ANSI/SPARC Architecture',
          question: 'The ability to modify the internal physical schema without affecting the conceptual schema is termed:',
          options: ['Logical Data Independence', 'Physical Data Independence', 'External View Independence', 'Dynamic Schema Partitioning'],
          correctIndex: 1,
          explanation: 'Physical Data Independence allows DBAs to tune indices, block layouts, and storage devices without changing the logical schema.'
        },
        {
          id: 'dbms-a3',
          section: 'A',
          marks: 1,
          topic: 'Relational Model Metrics',
          question: 'In the Relational Model, the total number of attributes (columns) in a relation is known as its:',
          options: ['Cardinality', 'Domain Count', 'Degree (Arity)', 'Tuple Space'],
          correctIndex: 2,
          explanation: 'Degree (or Arity) is the number of attributes in a relation, whereas Cardinality is the number of tuples (rows).'
        },
        {
          id: 'dbms-a4',
          section: 'A',
          marks: 1,
          topic: 'Database Keys',
          question: 'A Candidate Key is formally defined as a:',
          options: ['Super Key with at least two columns', 'Minimal Super Key containing no redundant attributes', 'Key that must reference another relation', 'Primary Key that allows NULL values'],
          correctIndex: 1,
          explanation: 'A Candidate Key is an irreducible, minimal Super Key such that removing any attribute destroys its uniqueness guarantee.'
        },
        {
          id: 'dbms-a5',
          section: 'A',
          marks: 1,
          topic: 'Relational Integrity',
          question: 'Entity Integrity constraint states that:',
          options: ['Foreign keys must not be NULL', 'Primary key attributes can never be NULL', 'Every table must have at least 2 candidate keys', 'Domain constraints cannot be checked at runtime'],
          correctIndex: 1,
          explanation: 'Entity Integrity requires that no primary key attribute value can be NULL, ensuring every entity can be uniquely distinguished.'
        },
        {
          id: 'dbms-a6',
          section: 'A',
          marks: 1,
          topic: 'Relational Algebra',
          question: 'Which relational algebra operator performs a horizontal filtering of rows based on a specified boolean predicate?',
          options: ['Projection (π)', 'Selection (σ)', 'Cartesian Product (×)', 'Rename (ρ)'],
          correctIndex: 1,
          explanation: 'Selection (denoted by Greek sigma σ) filters tuples horizontally based on a selection condition.'
        },
        {
          id: 'dbms-a7',
          section: 'A',
          marks: 1,
          topic: 'ER Modeling',
          question: 'In Chen ER notation, a Weak Entity Set is graphically represented by a:',
          options: ['Dashed Oval', 'Double Rectangle', 'Double Diamond', 'Hexagon'],
          correctIndex: 1,
          explanation: 'A double-lined rectangle denotes a weak entity set that lacks an independent primary key and depends on a strong entity.'
        },
        {
          id: 'dbms-a8',
          section: 'A',
          marks: 1,
          topic: 'SQL DDL vs DML',
          question: 'Which of the following statements regarding TRUNCATE TABLE is true?',
          options: ['It is a DML command that logs row-by-row deletions', 'It can be filtered with a WHERE clause', 'It is a DDL command that deallocates storage pages and resets identity counters', 'It deletes both data and the table catalog definition'],
          correctIndex: 2,
          explanation: 'TRUNCATE is a DDL statement that rapidly deallocates all table data blocks while preserving the table schema structure.'
        },
        {
          id: 'dbms-a9',
          section: 'A',
          marks: 1,
          topic: 'Three-Valued Logic',
          question: 'In standard SQL three-valued logic, what is the evaluation result of the expression: `50 > NULL`?',
          options: ['TRUE', 'FALSE', 'UNKNOWN', 'SYNTAX ERROR'],
          correctIndex: 2,
          explanation: 'Comparing any scalar value with NULL using comparison operators yields UNKNOWN in SQL three-valued logic.'
        },
        {
          id: 'dbms-a10',
          section: 'A',
          marks: 1,
          topic: 'Storage & B+ Trees',
          question: 'Why are B+ Trees preferred over B-Trees for database index implementation?',
          options: [
            'B+ Trees have lower fan-out and deeper tree heights',
            'Leaf nodes in B+ Trees are linked sequentially, enabling fast range query scans',
            'B+ Trees store full table data in root nodes',
            'B-Trees cannot support composite primary keys'
          ],
          correctIndex: 1,
          explanation: 'B+ Trees store data pointers exclusively in leaves and chain them in a doubly-linked list, enabling efficient sequential range scans.'
        }
      ]
    },
    sectionB: {
      title: 'Section B: SQL Joins, Aggregations & Query Execution',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dbms-b1',
          section: 'B',
          marks: 1,
          topic: 'Logical Query Order',
          question: 'What is the correct logical execution sequence of the following SQL clauses?',
          options: [
            'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY',
            'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY',
            'FROM -> GROUP BY -> WHERE -> HAVING -> SELECT -> ORDER BY',
            'WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY'
          ],
          correctIndex: 1,
          explanation: 'Logical order begins with FROM/JOIN, then WHERE row filters, GROUP BY partitioning, HAVING bucket filters, SELECT projection, and ORDER BY.'
        },
        {
          id: 'dbms-b2',
          section: 'B',
          marks: 1,
          topic: 'SQL Aggregation',
          question: 'Given a table `employees` with salaries: [50k, 60k, NULL, 90k]. What does `COUNT(salary)` return?',
          options: ['4', '3', 'NULL', '0'],
          correctIndex: 1,
          explanation: 'COUNT(column_name) ignores NULL entries and counts only valid non-null rows, returning 3. COUNT(*) would return 4.'
        },
        {
          id: 'dbms-b3',
          section: 'B',
          marks: 1,
          topic: 'Window Functions',
          question: 'If salaries in a department are [100k, 80k, 80k, 70k], what rank will `DENSE_RANK()` assign to the salary 70k?',
          options: ['Rank 4', 'Rank 3', 'Rank 2', 'Rank 5'],
          correctIndex: 1,
          explanation: 'DENSE_RANK assigns 1 to 100k, 2 to both 80k values, and does not skip numbers, giving rank 3 to 70k. (RANK() would assign 4).'
        },
        {
          id: 'dbms-b4',
          section: 'B',
          marks: 1,
          topic: 'SQL Joins',
          question: 'To retrieve all rows from table A and only matching rows from table B, returning NULL for unmatched B columns, one should use:',
          options: ['INNER JOIN', 'FULL OUTER JOIN', 'LEFT JOIN', 'CROSS JOIN'],
          correctIndex: 2,
          explanation: 'LEFT JOIN preserves all records from the left relation (A) and pads unmatched right-side attributes with NULL.'
        },
        {
          id: 'dbms-b5',
          section: 'B',
          marks: 1,
          topic: 'Anti-Join Pattern',
          question: 'Which query correctly finds all departments that currently have ZERO employees?',
          options: [
            'SELECT d.dept_name FROM depts d INNER JOIN emps e ON d.id = e.dept_id WHERE e.id IS NULL',
            'SELECT d.dept_name FROM depts d LEFT JOIN emps e ON d.id = e.dept_id WHERE e.dept_id IS NULL',
            'SELECT d.dept_name FROM depts d RIGHT JOIN emps e ON d.id = e.dept_id WHERE d.id IS NOT NULL',
            'SELECT d.dept_name FROM depts d CROSS JOIN emps e WHERE e.id = 0'
          ],
          correctIndex: 1,
          explanation: 'The Anti-Join pattern uses LEFT JOIN followed by `WHERE right_table.foreign_key IS NULL` to locate unmatched parent records.'
        },
        {
          id: 'dbms-b6',
          section: 'B',
          marks: 1,
          topic: 'Set Operators',
          question: 'What is the primary operational difference between `UNION` and `UNION ALL`?',
          options: [
            'UNION preserves duplicates, UNION ALL discards duplicates',
            'UNION performs an expensive sort to eliminate duplicate rows, while UNION ALL simply appends results without sorting',
            'UNION only works on numeric data types',
            'UNION ALL requires different column data types'
          ],
          correctIndex: 1,
          explanation: 'UNION filters duplicate records using a distinct sort pass, whereas UNION ALL directly concatenates streams with O(N) efficiency.'
        },
        {
          id: 'dbms-b7',
          section: 'B',
          marks: 1,
          topic: 'Self Join',
          question: 'A SELF JOIN is most commonly utilized in real-world database design to query:',
          options: [
            'Two distinct tables residing in separate database clusters',
            'Hierarchical or recursive parent-child relationships within the same table',
            'Cartesian cross products of unkeyed tables',
            'Tables without a primary key'
          ],
          correctIndex: 1,
          explanation: 'Self joins query hierarchical structures stored in a single table, such as employee-to-manager and category-to-parent hierarchies.'
        },
        {
          id: 'dbms-b8',
          section: 'B',
          marks: 1,
          topic: 'HAVING Clause',
          question: 'Can the `HAVING` clause be utilized in a SQL query without an explicit `GROUP BY` clause?',
          options: [
            'No, SQL syntax strictly demands GROUP BY before HAVING',
            'Yes, in which case the entire result set is treated as a single unified group',
            'Yes, but only if the query contains no WHERE clause',
            'No, HAVING only operates on partitioned window functions'
          ],
          correctIndex: 1,
          explanation: 'HAVING can be applied without GROUP BY; the database engine simply treats the entire filtered table as one single group.'
        },
        {
          id: 'dbms-b9',
          section: 'B',
          marks: 1,
          topic: 'Correlated Subqueries',
          question: 'A subquery is categorized as "Correlated" when:',
          options: [
            'It is executed exactly once before the outer query runs',
            'It references attributes belonging to the outer query, evaluating repeatedly for each outer row',
            'It only returns scalar integer constants',
            'It contains a UNION operator'
          ],
          correctIndex: 1,
          explanation: 'Correlated subqueries depend on column values from candidate rows in the outer query, executing iteratively per candidate tuple.'
        },
        {
          id: 'dbms-b10',
          section: 'B',
          marks: 1,
          topic: 'Common Table Expressions',
          question: 'Which SQL keyword is used to initialize a Common Table Expression (CTE)?',
          options: ['CREATE TEMP TABLE', 'WITH', 'DECLARE TABLE', 'DEFINE VIEW'],
          correctIndex: 1,
          explanation: 'The `WITH` keyword defines one or more Common Table Expressions (CTEs) preceding the primary query statement.'
        }
      ]
    },
    sectionC: {
      title: 'Section C: Normalization, ACID Transactions & Concurrency',
      count: 10,
      marksPerQuestion: 1,
      totalMarks: 10,
      questions: [
        {
          id: 'dbms-c1',
          section: 'C',
          marks: 1,
          topic: 'Attribute Closure',
          question: 'Given relation R(A, B, C, D) with FDs: {A -> B, B -> C, C -> D}. What is the attribute closure (A)+?',
          options: ['{A, B}', '{A, B, C}', '{A, B, C, D}', '{A, D}'],
          correctIndex: 2,
          explanation: '(A)+ starts with {A}, derives B via A->B, then C via B->C, then D via C->D, yielding {A, B, C, D}.'
        },
        {
          id: 'dbms-c2',
          section: 'C',
          marks: 1,
          topic: 'Second Normal Form (2NF)',
          question: 'A relation R is in 2NF if it is in 1NF and:',
          options: [
            'It contains no transitive dependencies',
            'Every non-prime attribute is fully functionally dependent on the whole candidate key (no partial dependency)',
            'Every determinant is strictly a super key',
            'All foreign keys are non-nullable'
          ],
          correctIndex: 1,
          explanation: '2NF eliminates partial dependencies where a non-prime attribute depends on only a proper subset of a composite candidate key.'
        },
        {
          id: 'dbms-c3',
          section: 'C',
          marks: 1,
          topic: 'Third Normal Form vs BCNF',
          question: 'For a non-trivial functional dependency X -> Y, 3NF permits Y to be a Prime Attribute even if X is not a Super Key. Does BCNF permit this exception?',
          options: [
            'Yes, BCNF is less strict than 3NF',
            'No, BCNF strictly requires X to be a Super Key for EVERY non-trivial FD',
            'Yes, provided Y consists of a single column',
            'No, BCNF requires both X and Y to be super keys'
          ],
          correctIndex: 1,
          explanation: 'BCNF eliminates the prime attribute exception of 3NF: in BCNF, determinant X must strictly be a Super Key for all non-trivial FDs.'
        },
        {
          id: 'dbms-c4',
          section: 'C',
          marks: 1,
          topic: 'Lossless Decomposition',
          question: 'Decomposing relation R into R1 and R2 is Lossless if and only if (R1 ∩ R2) functionally determines:',
          options: ['(R1 ∪ R2)', 'At least one of R1 or R2', 'Neither R1 nor R2', 'Only the prime attributes'],
          correctIndex: 1,
          explanation: 'A decomposition is lossless if the shared attributes (R1 ∩ R2) form a Super Key for either R1 or R2 (or both).'
        },
        {
          id: 'dbms-c5',
          section: 'C',
          marks: 1,
          topic: 'ACID Properties',
          question: 'Which ACID property guarantees that the intermediate uncommitted state of a transaction is invisible to other concurrent transactions?',
          options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
          correctIndex: 2,
          explanation: 'Isolation ensures that concurrent transactions execute independently and intermediate dirty writes remain concealed.'
        },
        {
          id: 'dbms-c6',
          section: 'C',
          marks: 1,
          topic: 'Conflict Serializability',
          question: 'Which of the following operation pairs on the same data item Q by different transactions does NOT produce a conflict?',
          options: ['Read(Q) and Write(Q)', 'Write(Q) and Read(Q)', 'Write(Q) and Write(Q)', 'Read(Q) and Read(Q)'],
          correctIndex: 3,
          explanation: 'Read-Read operations do not conflict because reading data does not alter state or invalidate concurrent views.'
        },
        {
          id: 'dbms-c7',
          section: 'C',
          marks: 1,
          topic: 'Precedence Graph',
          question: 'A concurrent schedule S is proven to be Conflict Serializable if and only if its Precedence Graph:',
          options: ['Contains an odd cycle', 'Is an undirected clique', 'Contains no directed cycles (is a DAG)', 'Contains isolated self-loops'],
          correctIndex: 2,
          explanation: 'According to the Serializability Theorem, an acyclic precedence graph guarantees conflict serializability.'
        },
        {
          id: 'dbms-c8',
          section: 'C',
          marks: 1,
          topic: 'Concurrency Anomalies',
          question: 'A Dirty Read anomaly occurs when transaction T2 reads data that has been modified by T1, and subsequently:',
          options: ['T1 commits successfully', 'T1 aborts and rolls back its changes', 'T2 writes to another table', 'T2 acquires an exclusive lock'],
          correctIndex: 1,
          explanation: 'A Dirty Read occurs when T2 reads uncommitted modifications of T1, and T1 subsequently rolls back, leaving T2 with invalid data.'
        },
        {
          id: 'dbms-c9',
          section: 'C',
          marks: 1,
          topic: 'Two-Phase Locking (2PL)',
          question: 'What is the main enhancement of Strict 2PL over basic Two-Phase Locking?',
          options: [
            'Strict 2PL prevents deadlocks',
            'Strict 2PL holds all exclusive (X) locks until the transaction commits or aborts, preventing cascading rollbacks',
            'Strict 2PL permits acquiring locks during the shrinking phase',
            'Strict 2PL eliminates all shared locks'
          ],
          correctIndex: 1,
          explanation: 'Strict 2PL holds exclusive locks until transaction termination, ensuring uncommitted updates are never read by others and preventing cascading aborts.'
        },
        {
          id: 'dbms-c10',
          section: 'C',
          marks: 1,
          topic: 'Deadlock Handling',
          question: 'In the Wait-For Graph (WFG) deadlock detection algorithm, a deadlock condition is confirmed when:',
          options: ['A node has more than 5 outgoing edges', 'A directed cycle exists in the graph', 'All transactions hold shared locks', 'A transaction enters the active state'],
          correctIndex: 1,
          explanation: 'A directed cycle in the Wait-For Graph indicates a circular wait dependency between transactions, representing a deadlock.'
        }
      ]
    }
  }
};
